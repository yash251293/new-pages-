# PostgreSQL Setup Instructions for Flexbone Project

This guide provides instructions to install PostgreSQL, start the service, create a dedicated database and user for the Flexbone project, and grant necessary privileges.

**Important Security Note:** The password `flexbone_password` is provided for ease of setup. **In a real or production environment, you must choose a strong, unique password.** The default username `flexbone_user` and database name `flexbone_db` are used in fallback configurations in `lib/db.ts`.

## 1. Install PostgreSQL

Choose the instructions relevant to your operating system.

### Ubuntu/Debian Linux

```bash
# Update your package list
sudo apt update

# Install PostgreSQL and its client utilities
sudo apt install -y postgresql postgresql-contrib

# Verify installation (optional)
psql --version
```

### macOS (using Homebrew)

If you don't have Homebrew, install it first from [brew.sh](https://brew.sh/).

```bash
# Install PostgreSQL
brew install postgresql

# To have launchd start postgresql now and restart at login:
brew services start postgresql
# Or, if you don't want/need a background service you can just run:
# pg_ctl -D /usr/local/var/postgres start # Path may vary

# Verify installation (optional)
psql --version
```
**Note for macOS users:** Homebrew might install a specific version (e.g., `postgresql@15`). Adjust commands if necessary. The `pg_ctl` data directory path (`-D`) might also vary based on your Homebrew setup (e.g., for Apple Silicon it might be `/opt/homebrew/var/postgres`, for Intel Macs `/usr/local/var/postgres`). If `brew services start postgresql` works, that is generally easier.


## 2. Start the PostgreSQL Service

For many installations, PostgreSQL will start automatically after installation. If not, use the appropriate command.

### Ubuntu/Debian Linux (using systemd)

```bash
# Start the PostgreSQL service if it's not already running
sudo systemctl start postgresql

# Enable it to start on boot (optional, but recommended for servers)
sudo systemctl enable postgresql

# Check the status of the service
sudo systemctl status postgresql
```

### macOS (using Homebrew)

If you used `brew services start postgresql` during installation, it should already be running.
If you opted for manual control, use the `pg_ctl start` command with the correct data directory path for your installation.

## 3. Create Database and User

These commands are typically run using the `psql` command-line utility, often as the default `postgres` superuser.

```bash
# Access the psql shell as the default postgres user
sudo -u postgres psql
```

If `sudo -u postgres psql` doesn't work (common on macOS or if you didn't create a `postgres` Linux user), you might be able to run `psql postgres` or just `psql` if your current OS user has permissions.

Once inside the `psql` shell, execute the following SQL commands:

```sql
-- Create the database user
CREATE USER flexbone_user WITH PASSWORD 'flexbone_password';

-- Create the database
CREATE DATABASE flexbone_db OWNER flexbone_user;

-- Connect to the new database to verify (optional)
\c flexbone_db

-- You should see a message like "You are now connected to database "flexbone_db" as user "postgres"."
-- (or as the user you connected with, if not postgres).

-- Exit psql
\q
```

**Again, remember to change `'flexbone_password'` to a strong password in a real environment.**

## 4. Grant Privileges

Now, grant the necessary privileges to `flexbone_user` on the `flexbone_db` database.
Access `psql` again if you exited (e.g., `sudo -u postgres psql`).

Then, execute the following SQL command:

```sql
-- Grant all privileges on the flexbone_db database to flexbone_user
GRANT ALL PRIVILEGES ON DATABASE flexbone_db TO flexbone_user;

-- (Optional but often needed) Grant privileges on all tables in the public schema (and future tables)
-- If you plan to use the schema.sql file provided for the project, the user will need these.
-- If not connected to flexbone_db, connect first: \c flexbone_db
GRANT ALL PRIVILEGES ON SCHEMA public TO flexbone_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flexbone_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flexbone_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO flexbone_user;

-- To ensure flexbone_user can use objects created by others (if applicable)
-- and that objects created by flexbone_user are accessible by them.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO flexbone_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO flexbone_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO flexbone_user;
```

After running these commands:
```sql
-- Exit psql
\q
```

## 5. Apply Schema (`schema.sql`)

After setting up the database and user, apply the project's schema using the `schema.sql` file.
From your terminal:
```bash
psql -U flexbone_user -d flexbone_db -h localhost -f path/to/your/project/schema.sql
```
You will be prompted for the `flexbone_password`. Replace `path/to/your/project/schema.sql` with the actual path to your `schema.sql` file. If the `schema.sql` is in the current directory, you can use `-f ./schema.sql`.

## 6. Configure Client Authentication (`pg_hba.conf`)

PostgreSQL uses a client authentication configuration file named `pg_hba.conf` to control which hosts are allowed to connect, which users can connect, which databases they can access, and the authentication method.

If you are unable to connect to the database as `flexbone_user` from your application or `psql` (even with the correct password), you might need to adjust this file.

**A. Find `pg_hba.conf`:**

You can find the location of this file by running the following command in `psql`:
```sql
SHOW hba_file;
```
Common locations:
*   Ubuntu/Debian: `/etc/postgresql/<VERSION>/main/pg_hba.conf`
*   macOS (Homebrew): `/usr/local/var/postgres/pg_hba.conf` or `/opt/homebrew/var/postgres/pg_hba.conf`

**B. Edit `pg_hba.conf`:**

You will need superuser privileges to edit this file (e.g., use `sudo nano <path_to_pg_hba.conf>`).

Add or modify lines to allow `flexbone_user` to connect to `flexbone_db`. For local development, allowing connections from `localhost` (127.0.0.1 for IPv4, ::1 for IPv6) is common. The order of rules matters; specific rules should come before more general ones.

Example entries (ensure these are placed appropriately, often towards the top of the active configuration lines):
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   flexbone_db     flexbone_user                           md5
host    flexbone_db     flexbone_user   127.0.0.1/32            md5
host    flexbone_db     flexbone_user   ::1/128                 md5
```

*   **Authentication Method**: `md5` is widely compatible. `scram-sha-256` is more secure and the default on newer PostgreSQL versions. If your server defaults to `scram-sha-256` (check existing entries), use that instead of `md5` for consistency if your client libraries support it. **Using `trust` is insecure and should be avoided.**

**C. Reload PostgreSQL Configuration:**

After saving changes to `pg_hba.conf`, you must reload the PostgreSQL configuration.

From your terminal:
```bash
# Ubuntu/Debian (using systemctl)
sudo systemctl reload postgresql

# macOS (using Homebrew services)
brew services reload postgresql
# Or, using pg_ctl (path might vary):
# pg_ctl -D /path/to/data_directory reload
```
Or, execute this SQL command as a superuser in `psql`:
```sql
SELECT pg_reload_conf();
```

After these steps, try connecting as `flexbone_user` again. Your PostgreSQL environment should now be ready for the Flexbone project.
