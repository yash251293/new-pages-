const express = require('express');
const bcrypt = require('bcryptjs');    // Requires npm install
const jwt = require('jsonwebtoken'); // Requires npm install
const db = require('../db');         // Assumes db/index.js and pg (requires npm install)
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { firebaseAdminAuth } = require('../config/firebaseAdmin');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const {
    email,
    password,
    user_type, // 'individual' or 'company'
    full_name, // For individual
    company_name, // For company
    industry, // For company
    company_size // For company
  } = req.body;

  // Basic Input Validation
  if (!email || !password || !user_type) {
    return res.status(400).json({ message: 'Email, password, and user type are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }
  if (!['individual', 'company'].includes(user_type)) {
    return res.status(400).json({ message: 'Invalid user type. Must be "individual" or "company".' });
  }
  if (user_type === 'individual' && !full_name) {
    return res.status(400).json({ message: 'Full name is required for individual users.' });
  }
  if (user_type === 'company' && !company_name) {
    return res.status(400).json({ message: 'Company name is required for company users.' });
  }

  try {
    // Check if user already exists
    const existingUserCheck = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (existingUserCheck.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user into database
    let insertQuery;
    let queryParams;
    if (user_type === 'individual') {
      insertQuery = `
        INSERT INTO users (email, password_hash, user_type, full_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, user_type, full_name, created_at;
      `;
      queryParams = [email, password_hash, user_type, full_name];
    } else { // company
      insertQuery = `
        INSERT INTO users (email, password_hash, user_type, company_name, industry, company_size)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, user_type, company_name, created_at;
      `;
      queryParams = [email, password_hash, user_type, company_name, industry, company_size];
    }

    const newUserResult = await db.query(insertQuery, queryParams);
    const newUser = newUserResult.rows[0];

    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser
    });

  } catch (error) {
    console.error('Detailed error during registration:', error); // Log the full error object

    if (error.code) { // Check if it's a pg error with a code
      console.error(`Database Error Code: ${error.code}, Routine: ${error.routine}`); // Log more pg details
      if (error.code === '23505') {
         return res.status(409).json({ message: 'User with this email already exists (database constraint).' });
      }
      // Example pg connection error codes:
      // '08001' - sqlclient_unable_to_establish_sqlconnection
      // '08006' - connection_failure
      // '28P01' - invalid_password (for DB user)
      // Add more specific checks if certain pg error codes are common for connection issues
      if (['08001', '08006', 'ECONNREFUSED', 'ENOTFOUND', 'ETIMEOUT'].includes(error.code) ||
          (error.message && (error.message.toLowerCase().includes('connect econrefused') || // Note: ECONNREFUSED is typically error.syscall or error.code for network errors, not error.message directly for pg
                             error.message.toLowerCase().includes('timeout') ||
                             error.message.toLowerCase().includes('database system is starting up')))) {
        return res.status(503).json({ message: 'Database connection error or database unavailable. Please try again later.' });
      }
      return res.status(500).json({ message: 'A database error occurred during registration. Please check server logs.'});
    }

    // Default server error if not a recognizable DB error
    res.status(500).json({ message: 'Server error during registration. Please check server logs for more details.' });
  }
});

// POST /api/auth/mark-as-verified - Mark user's contact (phone) as verified
// Protected route: Requires authentication
router.post('/mark-as-verified', authMiddleware, async (req, res, next) => {
  const userId = req.user.userId;

  // Potentially, the request body could indicate what was verified, e.g., { method: 'phone' }
  // For now, we assume it's phone verification as per the plan.

  try {
    const updateQuery = `
      UPDATE users
      SET is_phone_verified = TRUE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, email, is_phone_verified, user_type, full_name, company_name;
    `; // Added more fields to RETURNING for context if needed by frontend
    const { rows } = await db.query(updateQuery, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found to mark as verified.' });
    }

    res.status(200).json({
      message: 'User contact method marked as verified successfully.',
      user: rows[0] // Contains id, email, is_phone_verified, and other returned fields
    });
  } catch (error) {
    console.error('Error marking user as verified:', error);
    const err = new Error('Server error while marking user as verified.');
    // err.statusCode = 500; // Global error handler might set this.
    next(err); // Pass to global error handler
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Retrieve user by email
    const userResult = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // User matched, create JWT
    const payload = {
      userId: user.id,
      userType: user.user_type,
      email: user.email
      // Add other relevant non-sensitive info if needed
    };

    // Sign token
    // Ensure JWT_SECRET and JWT_EXPIRES_IN are in your .env file
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Default to 1 hour if not set
    );

    res.json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        full_name: user.full_name,
        company_name: user.company_name
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;

// POST /api/auth/google-signin
router.post('/google-signin', async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'ID token is required.' });
  }

  if (!firebaseAdminAuth) {
    console.error('Firebase Admin SDK is not initialized. Cannot perform Google Sign-In.');
    return res.status(500).json({ message: 'Google Sign-In is not configured on the server.' });
  }

  try {
    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);
    const { uid: google_id, email, name, picture } = decodedToken;

    let user;
    let existingUser;

    // Check if user exists by google_id
    const googleUserResult = await db.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
    if (googleUserResult.rows.length > 0) {
      existingUser = googleUserResult.rows[0];
    } else if (email) {
      // If not found by google_id, check by email (for linking accounts or if email is verified by Google)
      const emailUserResult = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
      if (emailUserResult.rows.length > 0) {
        existingUser = emailUserResult.rows[0];
        // If user found by email but google_id is not set, link the account
        if (!existingUser.google_id) {
          await db.query('UPDATE users SET google_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [google_id, existingUser.id]);
          existingUser.google_id = google_id; // Update in-memory object
        }
      }
    }

    if (existingUser) {
      user = existingUser;
      // Optionally update name/picture if changed, though this might overwrite user's preferred name
      // For simplicity, we'll skip auto-updating name from Google for existing users for now.
    } else {
      // New user: Create account
      // For password_hash, since it's Google Sign-In, we might not need one,
      // or we can generate a secure random password that won't be used.
      // Setting it to NULL if your DB schema allows, or a placeholder.
      // For now, let's assume password_hash can be NULL for social logins or requires a different setup.
      // The current schema has password_hash as NOT NULL.
      // A placeholder password or a flag indicating social login would be needed.
      // For this implementation, we'll create a user with a placeholder unusable password.
      const placeholderPassword = await bcrypt.hash(`google_${Date.now()}_${Math.random()}`, 10);

      const newUserResult = await db.query(
        `INSERT INTO users (email, password_hash, full_name, user_type, google_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, user_type, full_name, company_name, google_id, created_at, updated_at`,
        [email, placeholderPassword, name || 'User', 'individual', google_id] // Default to 'individual', name from token
      );
      user = newUserResult.rows[0];

      // Optionally create a basic user_profiles entry here if needed
      // await db.query('INSERT INTO user_profiles (user_id, bio) VALUES ($1, $2)', [user.id, 'Signed up with Google.']);
    }

    // Generate application JWT
    const appTokenPayload = {
      userId: user.id,
      userType: user.user_type,
      email: user.email,
    };
    const appToken = jwt.sign(
      appTokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: 'Google Sign-In successful!',
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        full_name: user.full_name,
        company_name: user.company_name,
        // Potentially add google_id or other relevant fields from your 'users' table
      },
    });

  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/id-token-revoked' || error.code === 'auth/invalid-id-token') {
      return res.status(401).json({ message: 'Invalid or expired Google ID token.' });
    }
    // Pass to global error handler for other errors
    const err = new Error('Server error during Google Sign-In.');
    err.statusCode = 500;
    next(err);
  }
});