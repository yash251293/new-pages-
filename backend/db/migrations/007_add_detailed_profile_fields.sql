-- Migration to add detailed profile fields from the "Complete Profile" page
-- to the user_profiles table.

-- Ensure the updated_at trigger function exists (it should from previous migrations)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

ALTER TABLE user_profiles
    -- Fields for 'Company' user type
    ADD COLUMN mission TEXT NULL,
    ADD COLUMN vision TEXT NULL,
    ADD COLUMN company_values TEXT[] NULL, -- Array of strings for company values
    ADD COLUMN job_openings JSONB NULL, -- Array of job opening objects
    ADD COLUMN team_size VARCHAR(50) NULL, -- Specific team size categories like "1-10", "11-50"
    ADD COLUMN company_culture_summary TEXT NULL, -- Description of company culture
    ADD COLUMN benefits_perks JSONB NULL, -- Array of benefit objects (title, description)

    -- Fields for 'Individual' user type
    -- professional_summary will use the existing 'bio' TEXT field.
    ADD COLUMN experiences JSONB NULL, -- Array of work experience objects
    ADD COLUMN education_entries JSONB NULL, -- Array of education objects
    ADD COLUMN skills TEXT[] NULL, -- Array of strings for skills (preferred over comma-separated key_skills)
    ADD COLUMN interests TEXT[] NULL, -- Array of strings for interests
    ADD COLUMN portfolio_url VARCHAR(512) NULL,
    ADD COLUMN github_url VARCHAR(512) NULL;

-- Comments for new columns
COMMENT ON COLUMN user_profiles.mission IS 'Company''s mission statement.';
COMMENT ON COLUMN user_profiles.vision IS 'Company''s vision for the future.';
COMMENT ON COLUMN user_profiles.company_values IS 'Array of company core values.';
COMMENT ON COLUMN user_profiles.job_openings IS 'JSONB array of company job openings. Each object can contain title, department, location, type, description.';
COMMENT ON COLUMN user_profiles.team_size IS 'Categorical representation of company team size (e.g., "1-10", "11-50"). Supplements users.company_size.';
COMMENT ON COLUMN user_profiles.company_culture_summary IS 'Detailed description of the company culture and work environment.';
COMMENT ON COLUMN user_profiles.benefits_perks IS 'JSONB array of company benefits and perks. Each object can contain title, description.';

COMMENT ON COLUMN user_profiles.experiences IS 'JSONB array of individual user''s work experiences. Each object can contain id, title, company, location, startDate, endDate, current, description.';
COMMENT ON COLUMN user_profiles.education_entries IS 'JSONB array of individual user''s education history. Each object can contain id, degree, school, location, startDate, endDate, gpa, description.';
COMMENT ON COLUMN user_profiles.skills IS 'Array of individual user''s skills. Preferred over the old key_skills field.';
COMMENT ON COLUMN user_profiles.interests IS 'Array of individual user''s professional or personal interests.';
COMMENT ON COLUMN user_profiles.portfolio_url IS 'URL to individual user''s personal portfolio.';
COMMENT ON COLUMN user_profiles.github_url IS 'URL to individual user''s GitHub profile.';

-- The trigger update_user_profiles_updated_at should already be on the table
-- and will handle updates to these new columns as well.
