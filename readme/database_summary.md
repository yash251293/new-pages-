# Database Summary

This document provides an overview of the database schema, setup instructions, and how the application interacts with the database.

## Database Access Mechanism

All database interactions within the application are channeled through the `lib/db.ts` module. This module provides a centralized and consistent way to perform database operations.

*   **Connection Pooling**: `lib/db.ts` utilizes the `pg` library to create a PostgreSQL connection pool (`pg.Pool`). This pool manages multiple client connections efficiently, reusing them for different queries, which enhances performance and resource management.
*   **Query Execution**: A core function, `query(text: string, params?: any[])`, is exported from `lib/db.ts`. All backend services and API routes use this function to execute SQL queries. It handles acquiring a client from the pool, executing the query, and releasing the client.
*   **Configuration**: The database connection is configured primarily via the `POSTGRES_URL` environment variable. If this variable is not set (common in local development), `lib/db.ts` falls back to a default connection string: `postgresql://flexbone_user:flexbone_password@localhost:5432/flexbone_db`. A warning is logged if this fallback is used in non-production environments.
*   **Logging**: The `query` function includes basic logging, outputting a snippet of the SQL query, the execution time, and the number of rows affected or returned. This is helpful for debugging and monitoring.
*   **Error Handling**: The connection pool in `lib/db.ts` has basic error handling for idle clients. The `query` function also implicitly handles query execution errors, which are then typically caught by the calling API route or service.

This centralized approach in `lib/db.ts` ensures that database access is managed consistently and efficiently throughout the application.

## Schema Details (`schema.sql`)

The database schema defines tables for managing users, their profiles, skills, work experience, education, and job-related functionalities.

### Core User and Profile Tables:

1.  **`users` Table:**
    *   Stores core user information.
    *   `id`: UUID, Primary Key, defaults to `gen_random_uuid()`.
    *   `email`: VARCHAR(255), Unique, Not Null.
    *   `password_hash`: VARCHAR(255), Not Null.
    *   `created_at`: TIMESTAMP WITH TIME ZONE, defaults to `CURRENT_TIMESTAMP`.
    *   `updated_at`: TIMESTAMP WITH TIME ZONE, defaults to `CURRENT_TIMESTAMP`.
    *   `reset_token_hash`: TEXT (Stores hashed password reset tokens).
    *   `reset_token_expires_at`: TIMESTAMP WITH TIME ZONE (Stores expiry for reset tokens).


2.  **`profiles` Table:**
    *   Stores extended user profile information.
    *   **Relationship**: One-to-one with `users` table.
    *   `id`: UUID, Primary Key, Foreign Key referencing `users(id)` (ON DELETE CASCADE).
    *   Fields include: `first_name`, `last_name`, `avatar_url`, `headline`, `bio`, contact details, job preferences, etc.

3.  **`skills` Table:**
    *   Master list of all available skills.
    *   `id`: SERIAL, Primary Key.
    *   `name`: VARCHAR(100), Unique, Not Null.

4.  **`user_skills` Table:**
    *   Join table for user's skills (Many-to-many between `users` and `skills`).
    *   `user_id`: UUID (FK to `users.id`).
    *   `skill_id`: INTEGER (FK to `skills.id`).
    *   `proficiency_level`: VARCHAR(50).

5.  **`user_experience` Table:**
    *   Stores user's work experience.
    *   `id`: SERIAL, Primary Key.
    *   `user_id`: UUID (FK to `users.id`).
    *   Fields include: `title`, `company_name`, `location`, dates, description.

6.  **`user_education` Table:**
    *   Stores user's education history.
    *   `id`: SERIAL, Primary Key.
    *   `user_id`: UUID (FK to `users.id`).
    *   Fields include: `school_name`, `degree`, `field_of_study`, dates, description.

### New Job Functionality Tables:

The following tables were added to support job postings, applications, and related features:

*   **`companies` Table**: Stores information about companies posting jobs.
    *   Key fields: `id` (UUID PK), `name`, `description`, `logo_url`, `website_url`, etc.
*   **`jobs` Table**: Stores details of job postings.
    *   Key fields: `id` (UUID PK), `company_id` (FK to `companies.id`), `posted_by_user_id` (FK to `users.id`), `title`, `description`, `location`, `job_type`, salary fields, `status`, etc.
*   **`job_skills_link` Table**: A join table for the many-to-many relationship between `jobs` and `skills`.
    *   Key fields: `job_id` (FK to `jobs.id`), `skill_id` (FK to `skills.id`).
*   **`job_applications` Table**: Stores applications submitted by users for jobs.
    *   Key fields: `id` (UUID PK), `job_id` (FK to `jobs.id`), `user_id` (FK to `users.id`), `application_date`, `status`, `cover_letter`, `resume_url`.
*   **`user_job_bookmarks` Table**: Allows users to bookmark jobs.
    *   Key fields: `user_id` (FK to `users.id`), `job_id` (FK to `jobs.id`).

The detailed structure, constraints, indexes, and triggers for all tables are defined in the `schema.sql` file.

### Triggers:

*   Triggers are defined to automatically update the `updated_at` column to the current timestamp whenever a row is updated in `users`, `profiles`, `user_experience`, `user_education`, `companies`, `jobs`, and `job_applications`.

### Indexes:

*   Appropriate indexes are defined on foreign keys and frequently queried columns (e.g., `users(email)`, `skills(name)`, `jobs(status)`, `jobs(location)`). Primary keys are automatically indexed.

## PostgreSQL Setup Instructions (`POSTGRESQL_SETUP.md`)

This document outlines the steps to set up a PostgreSQL database environment for the project. The default user/password/database name used in the setup instructions (`flexbone_user`/`flexbone_password`/`flexbone_db`) align with the fallback connection string in `lib/db.ts`.

### 1. Installation:

*   **Ubuntu/Debian:**
    ```bash
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
    ```
*   **macOS (Homebrew):**
    ```bash
    brew install postgresql
    brew services start postgresql
    ```

### 2. Start PostgreSQL Service:

*   Platform-dependent (e.g., `sudo systemctl start postgresql` or `brew services start postgresql`).

### 3. Create Database and User:

*   Access `psql`: `sudo -u postgres psql` (or `psql postgres` / `psql` on macOS).
*   SQL Commands:
    ```sql
    CREATE USER flexbone_user WITH PASSWORD 'flexbone_password'; -- !!CHANGE PASSWORD IN PRODUCTION!!
    CREATE DATABASE flexbone_db OWNER flexbone_user;
    ```

### 4. Grant Privileges:

*   Grant necessary privileges to `flexbone_user` on `flexbone_db`.
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE flexbone_db TO flexbone_user;
    -- Further grants for schema public may be needed depending on setup
    GRANT ALL PRIVILEGES ON SCHEMA public TO flexbone_user;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flexbone_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flexbone_user; -- Added for SERIAL types
    GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO flexbone_user; -- If any
    ```

### 5. Apply Schema:

*   Run the `schema.sql` file:
    ```bash
    psql -U flexbone_user -d flexbone_db -h localhost -f path/to/your/schema.sql
    ```

### 6. Configure Client Authentication (`pg_hba.conf`):

*   Ensure `pg_hba.conf` allows `flexbone_user` to connect to `flexbone_db` from `localhost` (or other relevant hosts) using a password method (e.g., `md5` or `scram-sha-256`).
*   Reload PostgreSQL configuration after changes.

**Security Note**: The setup guide uses `flexbone_password` as a placeholder. **This password must be changed to a strong, unique password in any real or production environment.** The `POSTGRES_URL` environment variable should be used in production for secure connection configuration.
