const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Assumes authMiddleware.js is in ../middleware
const db = require('../db'); // Assumes db/index.js exports a query function or pool
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // For ensuring directory exists

// Multer setup for resume uploads
const resumeUploadDir = path.join(__dirname, '..', 'uploads', 'resumes'); // Path relative to this routes file to project_root/uploads/resumes

// Ensure upload directory exists
if (!fs.existsSync(resumeUploadDir)) {
  fs.mkdirSync(resumeUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumeUploadDir);
  },
  filename: function (req, file, cb) {
    // Ensure req.user is available from authMiddleware
    const userId = req.user?.userId;
    if (!userId) {
      // This error will be caught by the custom multer error handler for the route
      return cb(new Error('User not authenticated for filename generation'), '');
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `user-${userId}-resume-${uniqueSuffix}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /pdf|doc|docx|rtf|txt/;
    // Check mimetype and originalname extension
    const mimetypeIsValid = allowedTypes.test(file.mimetype);
    const extnameIsValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetypeIsValid && extnameIsValid) {
      return cb(null, true);
    }
    // This error will be caught by the custom multer error handler for the route
    cb(new Error('File type not allowed. Only PDF, DOC, DOCX, RTF, TXT are permitted.'), false);
  }
});


// GET /api/users/me - Get current user's profile
// Protected route: Requires authentication
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user should be populated by authMiddleware and contain the user ID from the token
    // The JWT payload created during login was: { userId: user.id, userType: user.user_type, email: user.email }
    // So, we should use req.user.userId or req.user.id depending on how it was set in the token.
    // Let's assume the payload was { userId: user.id, ... }, so req.user.userId exists.
    // If not, adjust to req.user.id if that's what your JWT payload for user ID is named.

    const userId = req.user.userId; // Or req.user.id if that's the key in your JWT payload

    if (!userId) {
      // This case should ideally not be reached if authMiddleware is working correctly and token is valid
      return res.status(400).json({ message: 'User ID not found in token.' });
    }

    const userQuery = `
      SELECT
        u.id, u.email, u.user_type, u.full_name, u.company_name, u.industry, u.company_size,
        u.created_at AS user_created_at, u.updated_at AS user_updated_at,
        up.location, up.professional_title, up.years_of_experience, up.job_function,
        up.key_skills, up.education_level, up.field_of_study, up.institution,
        up.linkedin_url, up.website_url, up.bio, up.company_type, up.tech_stack,
        up.created_at AS profile_created_at, up.updated_at AS profile_updated_at,
        -- Individual preferences
        up.job_status, up.desired_roles, up.work_arrangement, up.experience_level_preference,
        up.salary_expectation_min, up.salary_expectation_max, up.salary_expectation_currency,
        up.career_goals, up.preferred_locations,
        -- Company preferences
        up.hiring_status, up.offered_employment_types, up.hiring_roles, up.hiring_locations,
        up.hiring_salary_min, up.hiring_salary_max, up.hiring_salary_currency,
        -- Culture preferences (individual)
        up.culture_preferences, up.remote_policy_importance, up.quiet_office_importance,
        up.ideal_next_job_description,
        -- Resume
        up.resume_file_path
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = $1;
    `;

    const { rows } = await db.query(userQuery, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userData = rows[0];
    const userResponse = {
      id: userData.id,
      email: userData.email,
      user_type: userData.user_type,
      full_name: userData.full_name,
      company_name: userData.company_name,
      industry: userData.industry,
      company_size: userData.company_size,
      user_created_at: userData.user_created_at,
      user_updated_at: userData.user_updated_at,
      profile: {
        location: userData.location,
        professional_title: userData.professional_title,
        years_of_experience: userData.years_of_experience,
        job_function: userData.job_function,
        key_skills: userData.key_skills,
        education_level: userData.education_level,
        field_of_study: userData.field_of_study,
        institution: userData.institution,
        linkedin_url: userData.linkedin_url,
        website_url: userData.website_url,
        bio: userData.bio,
        company_type: userData.company_type,
        tech_stack: userData.tech_stack,
        profile_created_at: userData.profile_created_at,
        profile_updated_at: userData.profile_updated_at,

        // Individual preferences
        job_status: userData.job_status,
        desired_roles: userData.desired_roles,
        work_arrangement: userData.work_arrangement,
        experience_level_preference: userData.experience_level_preference,
        salary_expectation_min: userData.salary_expectation_min,
        salary_expectation_max: userData.salary_expectation_max,
        salary_expectation_currency: userData.salary_expectation_currency,
        career_goals: userData.career_goals,
        preferred_locations: userData.preferred_locations,

        // Company preferences
        hiring_status: userData.hiring_status,
        offered_employment_types: userData.offered_employment_types,
        hiring_roles: userData.hiring_roles,
        hiring_locations: userData.hiring_locations,
        hiring_salary_min: userData.hiring_salary_min,
        hiring_salary_max: userData.hiring_salary_max,
        hiring_salary_currency: userData.hiring_salary_currency,

        // Culture preferences (individual)
        culture_preferences: userData.culture_preferences,
        remote_policy_importance: userData.remote_policy_importance,
        quiet_office_importance: userData.quiet_office_importance,
        ideal_next_job_description: userData.ideal_next_job_description,

        // Resume
        resume_file_path: userData.resume_file_path
      }
    };

    // If no profile exists, the profile object will have all null values.
    // Check if a key profile field (like professional_title for individual or company_type for company, or just bio) is null.
    // This indicates no actual profile record was joined.
    if (userResponse.profile.bio === null &&
        userResponse.profile.location === null &&
        userResponse.profile.professional_title === null && // Add a few more key fields
        userResponse.profile.company_type === null) {
      userResponse.profile = null; // Or an empty object {} if preferred by frontend
    }

    res.json(userResponse);

  } catch (error) {
    console.error('Error fetching user profile with details:', error);
    res.status(500).json({ message: 'Server error while fetching user profile.' });
  }
});

// PUT /api/users/profile - Update current user's profile
// Protected route: Requires authentication
router.put('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  const {
    // Fields for 'users' table
    full_name, // individual
    company_name, // company
    industry, // company
    company_size, // company
    // Fields for 'user_profiles' table
    location,
    professional_title, // individual
    years_of_experience, // individual
    job_function, // individual
    key_skills, // individual
    education_level, // individual
    field_of_study, // individual
    institution, // individual
    linkedin_url,
    website_url,
    bio,
    company_type, // company
    tech_stack // company
  } = req.body;

  const client = await db.pool.connect(); // Assuming db exports a pool object

  try {
    await client.query('BEGIN');

    // 1. Update 'users' table
    const usersTableFields = {};
    if (full_name !== undefined) usersTableFields.full_name = full_name;
    if (company_name !== undefined) usersTableFields.company_name = company_name;
    if (industry !== undefined) usersTableFields.industry = industry;
    if (company_size !== undefined) usersTableFields.company_size = company_size;
    // Add user_type check here if needed, e.g. only set full_name if user_type is 'individual'

    const usersSetClauses = Object.keys(usersTableFields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ');
    const usersValues = Object.values(usersTableFields);

    if (usersSetClauses.length > 0) {
      const updateUsersQuery = `UPDATE users SET ${usersSetClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = $1`;
      await client.query(updateUsersQuery, [userId, ...usersValues]);
    }

    // 2. Upsert into 'user_profiles' table
    const profileFields = {
      location, professional_title, years_of_experience, job_function,
      key_skills, education_level, field_of_study, institution,
      linkedin_url, website_url, bio, company_type, tech_stack
    };

    const definedProfileFields = {};
    for (const key in profileFields) {
      if (profileFields[key] !== undefined) {
        definedProfileFields[key] = profileFields[key];
      }
    }

    if (Object.keys(definedProfileFields).length > 0) {
      const profileColumns = Object.keys(definedProfileFields);
      const profileValuesPlaceholders = profileColumns.map((_, index) => `$${index + 2}`).join(', ');
      const profileConflictUpdates = profileColumns.map(col => `"${col}" = EXCLUDED."${col}"`).join(', ');

      const upsertProfileQuery = `
        INSERT INTO user_profiles (user_id, ${profileColumns.map(col => `"${col}"`).join(', ')})
        VALUES ($1, ${profileValuesPlaceholders})
        ON CONFLICT (user_id) DO UPDATE SET
          ${profileConflictUpdates}, updated_at = CURRENT_TIMESTAMP
        RETURNING *;
      `; // Added RETURNING * to get the upserted data

      await client.query(upsertProfileQuery, [userId, ...Object.values(definedProfileFields)]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Profile updated successfully.' }); // Could return updated profile data later

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating profile:', error);
    // Basic error check, can be enhanced with specific validation errors
    if (error.code === '23503') { // foreign key violation
        return res.status(400).json({ message: 'Invalid user reference for profile update.' });
    }
    if (error.code === '23505') { // unique constraint violation (should not happen with ON CONFLICT for user_id)
        return res.status(400).json({ message: 'Profile conflict, potentially duplicate data issue.' });
    }
    res.status(500).json({ message: 'Server error while updating profile.' });
  } finally {
    client.release();
  }
});

// PUT /api/users/preferences - Update current user's preferences
// Protected route: Requires authentication
router.put('/preferences', authMiddleware, async (req, res, next) => { // Added next for error handling
  const userId = req.user.userId;
  const userType = req.user.userType; // Get userType from authenticated user

  // Extract all possible preference fields from req.body
  const {
    // Individual preferences
    jobStatus,
    desiredRoles, // Array
    workArrangement,
    experienceLevel, // Renamed from experienceLevelPreference to match frontend state
    salaryExpectationMin,
    salaryExpectationMax,
    salaryExpectationCurrency,
    careerGoals, // Array
    locations, // Array (used by individual)
    // Company preferences
    hiringStatus,
    employmentType, // Frontend uses this for a single string, schema uses offered_employment_types (TEXT[])
                    // For now, let's assume frontend will send a single string for employmentType
                    // and offered_employment_types will be used if multiple types are supported later.
                    // Or, adjust schema/frontend to match. Let's map employmentType to offered_employment_types as a single element array for now.
    roles, // Array (roles company is hiring for)
    companyLocations, // Array (used by company)
    hiringSalaryMin,
    hiringSalaryMax,
    hiringSalaryCurrency
  } = req.body;

  const profileFieldsToUpdate = {};

  if (userType === 'individual') {
    if (jobStatus !== undefined) profileFieldsToUpdate.job_status = jobStatus;
    if (desiredRoles !== undefined) profileFieldsToUpdate.desired_roles = desiredRoles; // Assuming array comes correctly
    if (workArrangement !== undefined) profileFieldsToUpdate.work_arrangement = workArrangement;
    if (experienceLevel !== undefined) profileFieldsToUpdate.experience_level_preference = experienceLevel;
    if (salaryExpectationMin !== undefined) profileFieldsToUpdate.salary_expectation_min = salaryExpectationMin;
    if (salaryExpectationMax !== undefined) profileFieldsToUpdate.salary_expectation_max = salaryExpectationMax;
    if (salaryExpectationCurrency !== undefined) profileFieldsToUpdate.salary_expectation_currency = salaryExpectationCurrency;
    if (careerGoals !== undefined) profileFieldsToUpdate.career_goals = careerGoals; // Assuming array
    if (locations !== undefined) profileFieldsToUpdate.preferred_locations = locations; // Assuming array
  } else if (userType === 'company') {
    if (hiringStatus !== undefined) profileFieldsToUpdate.hiring_status = hiringStatus;
    // Handling employmentType: frontend sends a single string, DB schema has offered_employment_types (TEXT[])
    // For now, if employmentType (single string) is sent, store it as a single-element array in offered_employment_types.
    // This can be refined if the frontend starts sending an array for employmentType.
    if (employmentType !== undefined) profileFieldsToUpdate.offered_employment_types = [employmentType];
    if (roles !== undefined) profileFieldsToUpdate.hiring_roles = roles; // Assuming array
    if (companyLocations !== undefined) profileFieldsToUpdate.hiring_locations = companyLocations; // Assuming array
    if (hiringSalaryMin !== undefined) profileFieldsToUpdate.hiring_salary_min = hiringSalaryMin;
    if (hiringSalaryMax !== undefined) profileFieldsToUpdate.hiring_salary_max = hiringSalaryMax;
    if (hiringSalaryCurrency !== undefined) profileFieldsToUpdate.hiring_salary_currency = hiringSalaryCurrency;
  }

  if (Object.keys(profileFieldsToUpdate).length === 0) {
    return res.status(400).json({ message: 'No preference data provided to update.' });
  }

  // Construct the SET clause for the SQL query
  const setClauses = Object.keys(profileFieldsToUpdate)
    .map((key, index) => `"${key}" = $${index + 2}`) // Start parameters from $2 ($1 will be user_id)
    .join(', ');
  const values = Object.values(profileFieldsToUpdate);

  const updateQuery = `
    UPDATE user_profiles
    SET ${setClauses}, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *;
  `;

  try {
    const { rows } = await db.query(updateQuery, [userId, ...values]);
    if (rows.length === 0) {
      // This case should ideally not happen if user_id is valid and user_profiles entry was created during signup/profile update
      // Or, if user_profiles row doesn't exist, we might need an UPSERT or INSERT here.
      // For now, assuming user_profiles row exists from the main profile update.
      // Consider creating a profile row if it doesn't exist, similar to the main /profile PUT route's UPSERT logic.
      // For simplicity now, we'll return 404.
      const userProfileCheck = await db.query('SELECT 1 FROM user_profiles WHERE user_id = $1', [userId]);
      if (userProfileCheck.rows.length === 0) {
         // If no profile exists, it's better to create one with these preferences
         // This requires an INSERT statement. For now, let's stick to UPDATE and let client handle profile creation first.
         // This could be a point of future improvement if preferences can be set before initial profile details.
        return res.status(404).json({ message: 'User profile does not exist. Please complete initial profile setup.' });
      }
      // If profile exists but update affected 0 rows (e.g. user_id was wrong, though unlikely due to authMiddleware)
      return res.status(404).json({ message: 'User profile not found or no changes made.' });
    }
    res.status(200).json({ message: 'Preferences updated successfully.', preferences: rows[0] });
  } catch (error) {
    console.error('Error updating preferences:', error);
    // Pass error to the global error handler
    const err = new Error('Server error while updating preferences.');
    // err.statusCode = 500; // It's good practice to set a status code. Global handler might set this.
    next(err); // Use next(err) to pass to global error handler
  }
});

// PUT /api/users/culture - Update current individual user's culture preferences
// Protected route: Requires authentication
router.put('/culture', authMiddleware, async (req, res, next) => {
  const userId = req.user.userId;
  const userType = req.user.userType;

  if (userType !== 'individual') {
    return res.status(403).json({ message: 'Forbidden: This feature is only for individual users.' });
  }

  const {
    culturePrefs, // Array of strings
    remotePolicyImportance,
    quietOfficeImportance,
    nextJobDescription
  } = req.body;

  const cultureFieldsToUpdate = {};

  // Basic validation: Check if at least one field is provided
  let hasDataToUpdate = false;
  if (culturePrefs !== undefined) {
    cultureFieldsToUpdate.culture_preferences = culturePrefs;
    hasDataToUpdate = true;
  }
  if (remotePolicyImportance !== undefined) {
    cultureFieldsToUpdate.remote_policy_importance = remotePolicyImportance;
    hasDataToUpdate = true;
  }
  if (quietOfficeImportance !== undefined) {
    cultureFieldsToUpdate.quiet_office_importance = quietOfficeImportance;
    hasDataToUpdate = true;
  }
  if (nextJobDescription !== undefined) {
    cultureFieldsToUpdate.ideal_next_job_description = nextJobDescription;
    hasDataToUpdate = true;
  }

  if (!hasDataToUpdate) {
    return res.status(400).json({ message: 'No culture preference data provided to update.' });
  }

  const setClauses = Object.keys(cultureFieldsToUpdate)
    .map((key, index) => `"${key}" = $${index + 2}`)
    .join(', ');
  const values = Object.values(cultureFieldsToUpdate);

  const updateQuery = `
    UPDATE user_profiles
    SET ${setClauses}, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *;
  `;

  try {
    // Ensure user_profiles row exists before attempting to update
    const userProfileCheck = await db.query('SELECT 1 FROM user_profiles WHERE user_id = $1', [userId]);
    if (userProfileCheck.rows.length === 0) {
        // If no profile exists, it's an issue. Preferences should ideally be part of a profile.
        // Consider if an UPSERT or initial profile creation step was missed for this user.
        // For now, returning 404 as the main /profile PUT handles creation/upsert.
        return res.status(404).json({ message: 'User profile does not exist. Please complete initial profile setup before setting culture preferences.' });
    }

    const { rows } = await db.query(updateQuery, [userId, ...values]);
    // rows.length check here might be redundant if userProfileCheck passes and user_id is from token,
    // unless the user_id somehow became invalid between checks (highly unlikely).
    // However, keeping it as a safeguard or if the profile could be deleted by another process.
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Failed to update culture preferences or user profile not found.' });
    }
    res.status(200).json({ message: 'Culture preferences updated successfully.', culture_info: rows[0] });
  } catch (error) {
    console.error('Error updating culture preferences:', error);
    const err = new Error('Server error while updating culture preferences.');
    err.statusCode = 500; // It's good practice to set a status code
    next(err);
  }
});

// POST /api/users/resume - Upload resume for individual user
// Protected route: Requires authentication, handles single file upload named 'resume'
router.post('/resume', authMiddleware, (req, res, next) => {
  // Check user type after authMiddleware has run
  if (req.user.userType !== 'individual') {
    // Clean up the uploaded file if it exists, as it's an unauthorized attempt for this user type
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file after user type mismatch:", err);
      });
    }
    return res.status(403).json({ message: 'Forbidden: Resume upload is only for individual users.' });
  }
  // If userType is correct, proceed to multer upload
  next();
}, (req, res, next) => { // Intermediate step to handle multer processing and its specific errors
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file too large).
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred (e.g., file type not allowed from fileFilter, or auth error from filename storage function).
      return res.status(400).json({ message: err.message });
    }
    // If no error, proceed to the main route handler
    next();
  });
}, async (req, res, next) => { // 'resume' is the field name from FormData
  const userId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded.' });
  }

  // Construct the file path relative to a base that might be served or known to the app
  // For now, store a path relative to the 'uploads' dir, assuming 'uploads' is at project root.
  // This might need adjustment based on how files are served or accessed later.
  const resumeFilePath = path.join('resumes', req.file.filename).replace(/\\/g, '/'); // Normalize path separators to forward slashes


  try {
    const updateQuery = `
      UPDATE user_profiles
      SET resume_file_path = $1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
      RETURNING resume_file_path;
    `;
    const { rows } = await db.query(updateQuery, [resumeFilePath, userId]);

    if (rows.length === 0) {
      // This implies user_profiles row might not exist.
      // Clean up uploaded file as DB update failed
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file after DB row not found:", err);
      });
      return res.status(404).json({ message: 'User profile not found to update resume path.' });
    }

    res.status(200).json({
      message: 'Resume uploaded and profile updated successfully.',
      filePath: resumeFilePath, // Send back the path
      resume_info: rows[0]
    });
  } catch (error) {
    console.error('Error updating resume path in DB:', error);
    // If DB update fails, try to delete the uploaded file to avoid orphans
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting orphaned file after DB error:", err);
    });
    const err = new Error('Server error while saving resume information.');
    // err.statusCode = 500; // Global error handler might set this.
    next(err);
  }
});


module.exports = router;
