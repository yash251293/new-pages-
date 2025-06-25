# Setting up a Local PostgreSQL Development Environment

These instructions will guide you through setting up PostgreSQL locally for development purposes. A script is also provided to automate database and user creation.

## 1. Install PostgreSQL

You need to have PostgreSQL installed on your system.

*   **For Linux (Debian/Ubuntu):**
    Open your terminal and run:
    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```
    After installation, PostgreSQL service should start automatically. You can check its status with `sudo systemctl status postgresql`.

*   **For macOS (using Homebrew):**
    If you don't have Homebrew, install it first from [brew.sh](https://brew.sh/).
    Then, open your terminal and run:
    ```bash
    brew update
    brew install postgresql
    ```
    To have launchd start postgresql now and restart at login:
    ```bash
    brew services start postgresql
    ```
    Or, if you don't want/need a background service you can just run PostgreSQL when needed:
    ```bash
    pg_ctl -D /usr/local/var/postgres start # Or your specific data directory
    ```
    To stop it:
    ```bash
    pg_ctl -D /usr/local/var/postgres stop
    ```

## 2. Accessing PostgreSQL Prompt (psql)

After installation, you'll need to access the `psql` command-line utility to interact with PostgreSQL.

*   **For Linux:**
    PostgreSQL creates a default superuser named `postgres`. You can switch to this user and then run `psql`:
    ```bash
    sudo -i -u postgres
    psql
    ```
    You can exit `psql` by typing `\q` and return to your normal user session by typing `exit`.

*   **For macOS:**
    Homebrew usually allows you to run `psql` directly from your terminal as your current user if that user was the one who installed PostgreSQL. This user often has superuser privileges by default.
    ```bash
    psql postgres
    ```
    (The `postgres` argument connects to the default database named `postgres` which is created during installation.)

## 3. Create Database and User (Using the Script)

The provided `setup_postgres_dev.sh` script will:
    *   Define the database name (`app_dev_db`), username (`app_user`), and password (`app_password`).
    *   Attempt to drop any existing database and user with the same names to ensure a clean setup.
    *   Create the new user.
    *   Create the new database with the new user as the owner.
    *   Grant all privileges on the new database to the new user.
    *   Set the default timezone for the database to UTC (optional).

**How to use the script:**

1.  Ensure you have the `setup_postgres_dev.sh` script in your current directory.
2.  Make it executable:
    ```bash
    chmod +x setup_postgres_dev.sh
    ```
3.  Run it:
    ```bash
    ./setup_postgres_dev.sh
    ```
    The script will attempt to auto-detect the appropriate `psql` command. If it fails, you may need to edit the `PSQL_CMD` variable within the script or execute the SQL commands found inside the script manually within the `psql` shell (see step 2 for accessing `psql`).

**Script Content (`setup_postgres_dev.sh`):**
(The content of the `setup_postgres_dev.sh` script is embedded in the file itself.)

## 4. Verifying the Setup

After running the script, you can verify that the database and user were created:

*   **Access `psql`** (as `postgres` user on Linux, or your user on macOS):
    ```bash
    # For Linux:
    # sudo -i -u postgres
    # psql

    # For macOS:
    # psql postgres
    ```

*   **List users (within `psql`):**
    ```sql
    \du
    ```
    You should see `app_user` listed.

*   **List databases (within `psql`):**
    ```sql
    \l
    ```
    You should see `app_dev_db` listed, owned by `app_user`.

*   **Connect to the new database as the new user (from your regular terminal):**
    ```bash
    psql -U app_user -d app_dev_db -h localhost
    ```
    It will prompt for the password (which is `app_password` as per the script). If you can connect successfully, your setup is complete. Type `\q` to exit.

## 5. Connection String

Your application will likely need a connection string to connect to this database. Based on the script's defaults, it would be:

`postgresql://app_user:app_password@localhost:5432/app_dev_db`

Remember to replace `localhost` if your PostgreSQL server is running on a different host, and `5432` if it's on a different port (though 5432 is the default).

---

This guide should help developers set up their local PostgreSQL environment for this project. Remember to keep passwords secure in production environments.
