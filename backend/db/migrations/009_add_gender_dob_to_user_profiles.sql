-- Migration to add gender and date_of_birth columns to user_profiles table

ALTER TABLE user_profiles
ADD COLUMN gender VARCHAR(50) NULL,
ADD COLUMN date_of_birth DATE NULL;

COMMENT ON COLUMN user_profiles.gender IS 'User''s gender.';
COMMENT ON COLUMN user_profiles.date_of_birth IS 'User''s date of birth.';

-- The existing trigger on user_profiles for updated_at should handle this automatically.
-- No change to trigger needed.
