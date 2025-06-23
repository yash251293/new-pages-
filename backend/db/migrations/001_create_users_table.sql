-- Create a citext extension for case-insensitive emails if not already enabled
-- CREATE EXTENSION IF NOT EXISTS citext;
-- Consider enabling this manually in your DB if you want truly case-insensitive unique emails.
-- For simplicity in this script, we'll use standard VARCHAR and handle case in application logic or a unique lowercased index.

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    company_name VARCHAR(255),
    industry VARCHAR(255),
    company_size VARCHAR(100),
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('individual', 'company')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create an index on lowercased email for case-insensitive checks if not using citext
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (LOWER(email));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users; -- Drop if exists to avoid multiple triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
