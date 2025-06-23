-- Migration to add preferences columns to user_profiles table

ALTER TABLE user_profiles
ADD COLUMN job_status VARCHAR(255) NULL, -- For individuals: e.g., 'actively-looking', 'open-to-opportunities'
ADD COLUMN desired_roles TEXT[] NULL, -- For individuals: array of strings
ADD COLUMN work_arrangement VARCHAR(255) NULL, -- For individuals: e.g., 'remote', 'hybrid', 'in-office'
ADD COLUMN experience_level_preference VARCHAR(255) NULL, -- For individuals: e.g., 'entry-level', 'mid-level'
ADD COLUMN salary_expectation_min INTEGER NULL, -- For individuals
ADD COLUMN salary_expectation_max INTEGER NULL, -- For individuals
ADD COLUMN salary_expectation_currency VARCHAR(10) NULL, -- For individuals: e.g., 'USD', 'EUR'
ADD COLUMN career_goals TEXT[] NULL, -- For individuals: array of strings
ADD COLUMN preferred_locations TEXT[] NULL, -- For individuals: array of strings (can be named preferred_locations_individual if company also has locations)

ADD COLUMN hiring_status VARCHAR(255) NULL, -- For companies: e.g., 'actively-hiring', 'planning-to-hire'
ADD COLUMN offered_employment_types TEXT[] NULL, -- For companies: array of strings (e.g., 'full-time', 'part-time', 'contract')
-- 'roles' (hiring_roles) from preferences/page.tsx for company
ADD COLUMN hiring_roles TEXT[] NULL, -- For companies: array of strings
-- 'companyLocations' from preferences/page.tsx for company
ADD COLUMN hiring_locations TEXT[] NULL, -- For companies: array of strings
ADD COLUMN hiring_salary_min INTEGER NULL, -- For companies
ADD COLUMN hiring_salary_max INTEGER NULL, -- For companies
ADD COLUMN hiring_salary_currency VARCHAR(10) NULL; -- For companies: e.g., 'USD', 'EUR'

-- Update the trigger function (if it wasn't made generic, ensure it still exists)
-- This ensures updated_at is set when these new fields are modified.
-- The existing trigger on user_profiles should handle this automatically
-- as long as it's a BEFORE UPDATE FOR EACH ROW trigger.
-- No change to trigger needed if it's already generic.

COMMENT ON COLUMN user_profiles.job_status IS 'Individual''s job search status.';
COMMENT ON COLUMN user_profiles.desired_roles IS 'Individual''s desired job roles.';
COMMENT ON COLUMN user_profiles.work_arrangement IS 'Individual''s preferred work arrangement.';
COMMENT ON COLUMN user_profiles.experience_level_preference IS 'Individual''s targeted experience level for jobs.';
COMMENT ON COLUMN user_profiles.salary_expectation_min IS 'Individual''s minimum salary expectation.';
COMMENT ON COLUMN user_profiles.salary_expectation_max IS 'Individual''s maximum salary expectation.';
COMMENT ON COLUMN user_profiles.salary_expectation_currency IS 'Currency for individual''s salary expectation.';
COMMENT ON COLUMN user_profiles.career_goals IS 'Individual''s career goals.';
COMMENT ON COLUMN user_profiles.preferred_locations IS 'Individual''s preferred work locations.';

COMMENT ON COLUMN user_profiles.hiring_status IS 'Company''s current hiring status.';
COMMENT ON COLUMN user_profiles.offered_employment_types IS 'Employment types company is offering.';
COMMENT ON COLUMN user_profiles.hiring_roles IS 'Roles company is hiring for.';
COMMENT ON COLUMN user_profiles.hiring_locations IS 'Locations where company is hiring.';
COMMENT ON COLUMN user_profiles.hiring_salary_min IS 'Company''s minimum salary for offered roles.';
COMMENT ON COLUMN user_profiles.hiring_salary_max IS 'Company''s maximum salary for offered roles.';
COMMENT ON COLUMN user_profiles.hiring_salary_currency IS 'Currency for company''s offered salary.';
