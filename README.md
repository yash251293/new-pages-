# CultureFix Project (Working Title)

This project is a full-stack web application designed as a professional networking and job board platform, with distinct features for individual users and companies. It features a Next.js frontend and a Node.js/Express.js backend with a PostgreSQL database.

## Project Structure

-   **`Final UI/`**: Contains the Next.js frontend application.
-   **`backend/`**: Contains the Node.js/Express.js backend API.
-   **`ecosystem.config.js`**: PM2 configuration file for managing backend and frontend processes (if applicable for frontend).
-   **Database Migrations**: Located in `backend/db/migrations/`.

## Features Implemented/Updated in This Phase

1.  **Comprehensive Project Analysis**:
    *   Detailed analysis of frontend, backend, and database components.
    *   Identification of technologies: Next.js (React, TypeScript), Tailwind CSS, Node.js (Express.js), PostgreSQL.
    *   Review of API structure, authentication mechanisms, and database schema.

2.  **Login Page Replacement & Enhancement**:
    *   Replaced the existing login page with a new UI design.
    *   Implemented and debugged Email/Password login functionality using `react-hook-form` and `zod` for validation.
    *   Added and debugged a "Remember Me" feature for email/password login using `localStorage`.

3.  **Google Sign-In Integration**:
    *   **Frontend**:
        *   Integrated Firebase Authentication for Google Sign-In using `signInWithPopup`.
        *   Client-side logic to handle Google Sign-In, retrieve ID token, and send it to the backend.
        *   Managed loading states and user feedback (toasts) for the Google Sign-In button.
        *   Updated Firebase client setup (`Final UI/lib/firebase.ts`) to export `GoogleAuthProvider` and refactored to use default exports for Firebase services to resolve build warnings.
        *   Updated API utility functions (`Final UI/lib/api/index.ts`) to use default exports to resolve build warnings.
    *   **Backend**:
        *   Added `firebase-admin` SDK.
        *   Implemented Firebase Admin SDK initialization (`backend/config/firebaseAdmin.js`), supporting credentials via `GOOGLE_APPLICATION_CREDENTIALS` environment variable or a local key file.
        *   Created a database migration (`008_add_google_id_to_users.sql`) to add a `google_id` column to the `users` table.
        *   Updated the `/api/auth/google-signin` route to handle Firebase ID tokens:
            *   Verifies the ID token.
            *   Finds an existing user by `google_id` or `email` (linking accounts if necessary).
            *   Creates a new user if one doesn't exist, storing `google_id` and using a placeholder password.
            *   Generates an application-specific JWT for the session.

4.  **LinkedIn Sign-In (Partial Setup - Deferred)**:
    *   Created a database migration (`009_add_linkedin_id_to_users.sql`) to add `linkedin_id` to the `users` table.
    *   Updated Firebase client setup (`Final UI/lib/firebase.ts`) to include `LinkedInAuthProvider`.
    *   Updated the backend sign-in route (`/api/auth/google-signin`) to be more generic, capable of distinguishing between Google and LinkedIn providers based on the Firebase ID token and using the appropriate `google_id` or `linkedin_id` field.
    *   Full implementation of LinkedIn Sign-In (frontend button logic, user configuration on LinkedIn Developer Portal) has been deferred.

5.  **Build Issue Resolution**:
    *   Diagnosed and resolved persistent Next.js build errors ("Unexpected token `div`", "Attempted import error") related to client components, `react-hook-form`'s `Controller`, and module export/import resolution with path aliases. This involved systematic debugging, commenting out code sections, and refactoring module exports to use default exports for certain shared utilities (`firebase.ts`, `api/index.ts`).
    *   Guided on clearing Next.js build cache (`.next` folder).

## Setup and Running the Project

### Backend (`backend/`)

1.  **Environment Variables**:
    The backend relies on environment variables for configuration. These are typically managed via an `ecosystem.config.js` for PM2 deployments or a `.env` file in the `backend/` directory for local development (though the current `backend/db/index.js` tries to load `../.env`, meaning a root `.env` file).
    Key variables (as seen in `ecosystem.config.js` during debugging):
    *   `DB_HOST` (e.g., `localhost`)
    *   `DB_PORT` (e.g., `5432`)
    *   `DB_USER` (e.g., `flexbone_user`)
    *   `DB_PASSWORD` (e.g., `flexbone_password`)
    *   `DB_NAME` (e.g., `flexbone_db`)
    *   `PORT` (e.g., `3001`)
    *   `JWT_SECRET`
    *   `JWT_EXPIRES_IN`
    *   `GOOGLE_APPLICATION_CREDENTIALS`: **Absolute path** to your Firebase Admin SDK service account JSON key file. This is required for backend verification of Google/LinkedIn Sign-In tokens.

2.  **Dependencies**:
    Navigate to the `backend` directory and run:
    ```bash
    npm install
    ```

3.  **Database Migrations**:
    The project contains SQL migration files in `backend/db/migrations/`. These need to be applied to your PostgreSQL database.
    *   `001_create_users_table.sql`
    *   `002_create_user_profiles_table.sql`
    *   ...
    *   `008_add_google_id_to_users.sql`
    *   `009_add_linkedin_id_to_users.sql`
    Apply these manually using `psql` or your preferred migration tool. Example for manual application (connect to your DB first):
    ```psql
    \i /path/to/project/backend/db/migrations/MIGRATION_FILE_NAME.sql
    ```

4.  **Running Locally**:
    ```bash
    npm run dev
    ```
    (This usually uses `nodemon` as per `package.json`). Or:
    ```bash
    npm start
    ```

5.  **Running with PM2 (Production/Staging)**:
    Use the `ecosystem.config.js` file located in the project root.
    ```bash
    pm2 start ecosystem.config.js
    pm2 save # To persist across server reboots
    ```
    Ensure environment variables, especially `GOOGLE_APPLICATION_CREDENTIALS`, are correctly set within the `env` block of your app definition in `ecosystem.config.js`.

### Frontend (`Final UI/`)

1.  **Environment Variables**:
    The frontend requires Firebase client configuration variables, prefixed with `NEXT_PUBLIC_`. These should be in a `.env.local` file in the `Final UI/` directory.
    *   `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:3001/api` for local dev, or your production API URL)
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`
    *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

2.  **Dependencies**:
    Navigate to the `Final UI` directory and run:
    ```bash
    npm install
    ```

3.  **Running Locally**:
    ```bash
    npm run dev
    ```
    This will typically start the Next.js development server on `http://localhost:3000`.

4.  **Building for Production**:
    ```bash
    npm run build
    npm start
    ```
    Or use PM2 as defined in `ecosystem.config.js` for the frontend.

## Important Configuration for Social Logins

### Google Sign-In
*   **Firebase Console**:
    *   Enable Google as a sign-in provider in Authentication -> Sign-in method.
    *   Ensure your web app's Firebase config (API key, authDomain, etc.) is used in the frontend.
    *   Add your application domain (e.g., `100networks.com`, `localhost`) to the "Authorized domains" list.
*   **Google Cloud Console (OAuth Consent Screen)**:
    *   Configure the OAuth consent screen for your project: Application name, logo, support email, authorized domains (must include your app domain and the Firebase auth domain `[PROJECT_ID].firebaseapp.com`).
*   **Backend**:
    *   Requires the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to be set with the path to your Firebase Admin service account JSON key.

### LinkedIn Sign-In (Currently Deferred)
*   **LinkedIn Developer Portal**:
    *   Create an app, get Client ID & Secret.
    *   Add "Sign In with LinkedIn" product.
    *   Add the Firebase OAuth redirect URI (e.g., `https://[PROJECT_ID].firebaseapp.com/__/auth/handler`) to "Authorized Redirect URLs".
*   **Firebase Console**:
    *   Enable LinkedIn provider, enter Client ID & Secret.
*   **Backend**:
    *   The generic Firebase token verification endpoint should handle LinkedIn tokens. The `linkedin_id` field in the `users` table is ready.
*   **Frontend**:
    *   The `LinkedInAuthProvider` is set up in `firebase.ts`. The login page button handler `handleLinkedInSignInClick` is in place but may need its internal logic uncommented/completed when this feature is fully activated.

## Notes
*   This README reflects the state of the project after a series of development and debugging sessions.
*   Ensure all environment variables and paths are correctly configured for your specific setup.
*   Regularly check `pm2 logs` for backend issues if using PM2.
*   Clear the Next.js cache (`Final UI/.next` folder) if you encounter unexpected build behaviors after code changes.
