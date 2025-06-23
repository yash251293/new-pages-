# Environment Variable Setup

For the application to function correctly, especially for features like JWT-based authentication and database connectivity, specific environment variables **must** be defined in your server environment.

## Mandatory Environment Variables

### `JWT_SECRET`

*   **Purpose**: This is a critical secret key used by `jsonwebtoken` to sign and verify JSON Web Tokens (JWTs). It ensures that tokens are authentic, have not been tampered with, and were issued by this application.
*   **Security**: This secret key **must be kept strictly confidential** and should **never** be committed to version control (e.g., Git) or exposed to the client-side. Leaking this secret would allow anyone to forge valid JWTs.
*   **Generation**: You need to generate a strong, random, and unique string for this secret. A recommended method is using OpenSSL:
    ```bash
    openssl rand -hex 32
    ```
    This command will produce a 64-character hexadecimal string, suitable for a strong secret.
*   **Usage**:
    *   **Development**: Create a `.env.local` file in the root of your project (if it doesn't already exist). Add the `JWT_SECRET` to this file:
        ```env
        JWT_SECRET=your_generated_strong_secret_here_from_openssl
        ```
        Ensure that `.env.local` is listed in your `.gitignore` file to prevent accidental commits.
    *   **Production**: Set this environment variable directly in your deployment platform's settings (e.g., Vercel, Netlify, AWS environment variables, Docker environment variables).

**Consequences of Missing `JWT_SECRET`**: If `JWT_SECRET` is not set or is invalid, the application will fail to generate JWTs upon login and will be unable to verify JWTs for protected API routes, effectively breaking user authentication. Server logs will typically indicate if the `JWT_SECRET` is missing when authentication utility functions (like `verifyAuthToken` from `lib/authUtils.ts`) are called.

### `POSTGRES_URL`

*   **Purpose**: This variable provides the connection string that the application (specifically `lib/db.ts`) uses to connect to your PostgreSQL database.
*   **Format**: The URL typically follows the format:
    `postgresql://<user>:<password>@<host>:<port>/<database_name>`
    For example: `postgresql://flexbone_user:your_strong_password@localhost:5432/flexbone_db`
*   **Usage**:
    *   **Development**: Add the `POSTGRES_URL` to your `.env.local` file:
        ```env
        POSTGRES_URL=postgresql://flexbone_user:flexbone_password@localhost:5432/flexbone_db
        ```
        Replace `flexbone_password` with the actual password you set during PostgreSQL setup. If you are using a different username, host, port, or database name, update those accordingly.
    *   **Production**: Set this environment variable in your deployment platform's settings. It should point to your production PostgreSQL database instance.
*   **Fallback**: If `POSTGRES_URL` is not set, `lib/db.ts` will attempt to use a hardcoded fallback URL (`postgresql://flexbone_user:flexbone_password@localhost:5432/flexbone_db`) and log a warning. This fallback is intended for convenience in local development setups where the default user/db from `POSTGRESQL_SETUP.md` is used, but relying on it is not recommended for clarity or for any environment diversity.

## Example `.env.local` File

Here’s how your `.env.local` file might look with these variables:

```env
# For Database Connection (replace with your actual credentials)
POSTGRES_URL=postgresql://flexbone_user:your_actual_secure_password@localhost:5432/flexbone_db

# For JWT Authentication (replace with your generated secret)
JWT_SECRET=your_generated_strong_random_string_here_e_g_output_from_openssl_rand_hex_32

# Base URL for constructing links (e.g., in password reset emails)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Note on `NEXT_PUBLIC_BASE_URL`**: While not strictly a server-side secret, `NEXT_PUBLIC_BASE_URL` is important for constructing absolute URLs that might be sent in emails or used in other parts of the application that require knowledge of the application's public-facing base URL. Prefixing with `NEXT_PUBLIC_` makes it available to client-side code as well.

**Important**: Always restart your Next.js development server after making changes to `.env.local` for the new values to take effect.
