-- Migration to add resume file path column to user_profiles table (for individuals)

ALTER TABLE user_profiles
ADD COLUMN resume_file_path TEXT NULL; -- Store the path or identifier for the uploaded resume

COMMENT ON COLUMN user_profiles.resume_file_path IS 'Path or storage key for the individual''s uploaded resume file.';
