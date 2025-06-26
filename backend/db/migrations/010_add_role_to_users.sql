-- Add a 'role' column to the 'users' table
-- This column will store the user's role (e.g., 'user', 'admin') for RBAC.
-- We'll define a new ENUM type for roles to ensure data integrity.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE user_role_enum AS ENUM ('user', 'admin');
    END IF;
END$$;

ALTER TABLE users
ADD COLUMN role user_role_enum DEFAULT 'user' NOT NULL;

-- Optionally, you might want to update existing users to have the 'user' role.
-- However, the DEFAULT 'user' should handle new users, and for existing ones,
-- if this is a new system, they might all be 'user' by default or need manual assignment.
-- For safety and typical migration patterns, let's assume existing users should be 'user'.
-- If the column was added without a default and NOT NULL first, this would be essential.
-- With DEFAULT 'user' NOT NULL, this explicit update is less critical for new tables but good practice.
-- If there are existing rows, and the ADD COLUMN was done without a default first, then:
-- UPDATE users SET role = 'user' WHERE role IS NULL;

-- Add an index on the role column if you anticipate frequent lookups based on role.
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

COMMENT ON COLUMN users.role IS 'Role of the user, e.g., ''user'' or ''admin''. Used for role-based access control.';
