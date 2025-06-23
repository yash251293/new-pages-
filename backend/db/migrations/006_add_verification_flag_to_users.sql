-- Migration to add a phone verification flag to the users table

ALTER TABLE users
ADD COLUMN is_phone_verified BOOLEAN DEFAULT FALSE NOT NULL;

COMMENT ON COLUMN users.is_phone_verified IS 'Indicates if the user''s phone number has been verified (e.g., via OTP).';

-- Optionally, you might want to add an index if you query by this often,
-- though for a simple flag, it might not be immediately necessary.
-- CREATE INDEX IF NOT EXISTS idx_users_is_phone_verified ON users(is_phone_verified);
