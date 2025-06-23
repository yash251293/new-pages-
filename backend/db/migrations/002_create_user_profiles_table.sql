-- Migration to create the user_profiles table

-- Ensure the updated_at trigger function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the user_profiles table
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, -- Corrected to INTEGER based on system catalog
    location VARCHAR(255) NULL,
    professional_title VARCHAR(255) NULL, -- Primarily for individuals
    years_of_experience VARCHAR(50) NULL, -- Primarily for individuals
    job_function VARCHAR(255) NULL, -- Primarily for individuals
    key_skills TEXT NULL, -- Primarily for individuals, can be comma-separated
    education_level VARCHAR(255) NULL, -- Primarily for individuals
    field_of_study VARCHAR(255) NULL, -- Primarily for individuals
    institution VARCHAR(255) NULL, -- Primarily for individuals
    linkedin_url VARCHAR(512) NULL,
    website_url VARCHAR(512) NULL,
    bio TEXT NULL, -- Individual's summary or Company's description
    company_type VARCHAR(100) NULL, -- Primarily for companies
    tech_stack TEXT NULL, -- Primarily for companies, can be comma-separated
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for frequently queried columns (optional, but good practice)
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_location ON user_profiles(location);
CREATE INDEX idx_user_profiles_job_function ON user_profiles(job_function);
CREATE INDEX idx_user_profiles_company_type ON user_profiles(company_type);

-- Create the trigger for updating updated_at on user_profiles table
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Optional: Add comments to columns
COMMENT ON COLUMN user_profiles.professional_title IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.years_of_experience IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.job_function IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.key_skills IS 'Primarily for individual users; can be comma-separated values.';
COMMENT ON COLUMN user_profiles.education_level IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.field_of_study IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.institution IS 'Primarily for individual users.';
COMMENT ON COLUMN user_profiles.bio IS 'Can be used for an individual''s summary or a company''s description.';
COMMENT ON COLUMN user_profiles.company_type IS 'Primarily for company users.';
COMMENT ON COLUMN user_profiles.tech_stack IS 'Primarily for company users; can be comma-separated values.';

-- End of migration
-- PRAGMA user_version = 2; -- This is SQLite specific, commented out for PostgreSQL.
