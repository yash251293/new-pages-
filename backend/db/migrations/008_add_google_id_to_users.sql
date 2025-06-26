-- Migration to add google_id to the users table for Google Sign-In

ALTER TABLE users
ADD COLUMN google_id VARCHAR(255) NULL UNIQUE;

-- Optional: Add an index for faster lookups if you query by google_id frequently
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

COMMENT ON COLUMN users.google_id IS 'Stores the unique User ID provided by Google upon successful authentication.';

-- No trigger update needed as this doesn't change the updated_at logic for existing triggers.
