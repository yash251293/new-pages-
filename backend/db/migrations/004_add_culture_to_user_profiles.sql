-- Migration to add culture preference columns to user_profiles table (for individuals)

ALTER TABLE user_profiles
ADD COLUMN culture_preferences TEXT[] NULL, -- For individuals: array of selected string labels
ADD COLUMN remote_policy_importance VARCHAR(255) NULL, -- For individuals: e.g., 'Very important', 'Important', 'Not important'
ADD COLUMN quiet_office_importance VARCHAR(255) NULL, -- For individuals: e.g., 'Very important', 'Important', 'Not important'
ADD COLUMN ideal_next_job_description TEXT NULL; -- For individuals: max 300 chars

COMMENT ON COLUMN user_profiles.culture_preferences IS 'Individual''s selected work culture preferences (labels).';
COMMENT ON COLUMN user_profiles.remote_policy_importance IS 'Individual''s stated importance of remote work flexibility.';
COMMENT ON COLUMN user_profiles.quiet_office_importance IS 'Individual''s stated importance of a quiet office environment.';
COMMENT ON COLUMN user_profiles.ideal_next_job_description IS 'Individual''s description of their ideal next job opportunity.';
