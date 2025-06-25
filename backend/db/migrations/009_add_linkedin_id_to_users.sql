-- Migration to add linkedin_id to the users table for LinkedIn Sign-In

ALTER TABLE users
ADD COLUMN linkedin_id VARCHAR(255) NULL UNIQUE;

-- Optional: Add an index for faster lookups if you query by linkedin_id frequently
CREATE INDEX IF NOT EXISTS idx_users_linkedin_id ON users(linkedin_id);

COMMENT ON COLUMN users.linkedin_id IS 'Stores the unique User ID provided by LinkedIn (or Firebase UID if using Firebase for LinkedIn auth) upon successful authentication.';
