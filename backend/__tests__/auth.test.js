const request = require('supertest');
const app = require('../index'); // The Express app
const db = require('../db'); // To interact with the database for cleanup or setup if needed

// Helper to generate unique email for each test run
const generateUniqueEmail = () => `testuser_${Date.now()}@example.com`;

describe('Auth API Endpoints', () => {
  // Hold a user's credentials for login tests
  let testUserCredentials = {};

  // Clean up the database after all tests if necessary, or specific entries
  // This is complex to do correctly without a dedicated test DB and migration strategy for tests.
  // For now, we will try to register unique users and not perform widespread cleanup.
  // Consider using a transaction for each test or a library to reset DB state.

  afterAll(async () => {
    // If you need to cleanup specific test users, do it here.
    // Example: await db.query("DELETE FROM users WHERE email LIKE 'testuser_%@example.com'");
    // For now, we'll skip aggressive cleanup to avoid deleting non-test data if tests run on a shared DB.
    // Close the database pool if your db module holds a persistent connection that Jest might keep open.
    if (db.pool && typeof db.pool.end === 'function') {
      await db.pool.end();
    }
  });

  describe('POST /api/auth/register', () => {
    it('should register a new individual user successfully', async () => {
      const uniqueEmail = generateUniqueEmail();
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: uniqueEmail,
          password: 'password123',
          user_type: 'individual',
          full_name: 'Test User',
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User registered successfully!');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(uniqueEmail);
      expect(response.body.user.user_type).toBe('individual');
      // Role is not returned directly in registration response by current code, but DB will set it.

      // Store credentials for login test
      testUserCredentials.email = uniqueEmail;
      testUserCredentials.password = 'password123';
    });

    it('should register a new company user successfully', async () => {
      const uniqueEmail = generateUniqueEmail();
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: uniqueEmail,
          password: 'password123',
          user_type: 'company',
          company_name: 'Test Company Inc.',
          industry: 'Tech',
          company_size: '1-10',
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User registered successfully!');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(uniqueEmail);
      expect(response.body.user.user_type).toBe('company');
    });

    it('should fail if email already exists', async () => {
      const uniqueEmail = generateUniqueEmail();
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          email: uniqueEmail,
          password: 'password123',
          user_type: 'individual',
          full_name: 'Test User',
        });

      // Attempt to register again with the same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: uniqueEmail,
          password: 'password123',
          user_type: 'individual',
          full_name: 'Another Test User',
        });
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toMatch(/User with this email already exists/);
    });

    it('should fail if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          // Missing email, password, user_type
          full_name: 'Test User',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Email, password, and user type are required.');
    });

    it('should fail if email format is invalid', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: 'invalidemail',
            password: 'password123',
            user_type: 'individual',
            full_name: 'Test User',
          });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid email format.');
    });
     it('should fail if password is too short', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: generateUniqueEmail(),
            password: '123',
            user_type: 'individual',
            full_name: 'Test User',
          });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Password must be at least 8 characters long.');
    });
  });

  describe('POST /api/auth/login', () => {
    // This test depends on the successful registration in the describe block above.
    // Ensure `testUserCredentials` is populated.
    it('should login an existing user successfully', async () => {
      // Pre-condition: A user must have been registered.
      // This relies on the testUserCredentials being set by a successful registration test.
      // This makes tests dependent, which is not ideal.
      // A better approach would be to register a user in a beforeEach for this describe block.
      if (!testUserCredentials.email) {
        // Fallback: register a user if the previous test didn't set it (e.g. when running only this describe block)
        testUserCredentials.email = generateUniqueEmail();
        testUserCredentials.password = 'password123';
        await request(app)
            .post('/api/auth/register')
            .send({
                email: testUserCredentials.email,
                password: testUserCredentials.password,
                user_type: 'individual',
                full_name: 'Login Test User'
            });
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserCredentials.email,
          password: testUserCredentials.password,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Logged in successfully!');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(testUserCredentials.email);
      expect(response.body.user.role).toBe('user'); // Check for the new role field
    });

    it('should fail to login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUserCredentials.email, // Assuming this user exists
          password: 'wrongpassword',
        });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Invalid credentials. Password incorrect.');
    });

    it('should fail to login if user does not exist', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistentuser@example.com',
          password: 'password123',
        });
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Invalid credentials. User not found.');
    });

    it('should fail if email or password is not provided', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({}); // Empty body
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email and password are required.');
    });
  });
});
