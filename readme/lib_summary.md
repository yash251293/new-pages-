# lib/ Directory Summary

This document summarizes the purpose, key functions/classes, and contributions of the files found in the `lib/` directory.

## `lib/authClient.ts`

*   **Purpose**:
    Manages the client-side authentication token (JWT) in the browser's `localStorage`. It provides functions for logging in, logging out, retrieving the token, and checking authentication status. It also dispatches a custom event on window to allow other parts of the application to react to authentication state changes.

*   **Key Variable**:
    *   `TOKEN_KEY`: Currently `'fake_jwt_token'`. This key is used to store and retrieve the JWT from `localStorage`.
    *   **Recommendation**: Strongly recommend changing `TOKEN_KEY` to a more appropriate and descriptive name such as `'authToken'` or `'jwtToken'`, especially since the application now handles real JWTs, to avoid confusion with its outdated name.

*   **Key Functions**:
    *   `login(token: string): void`: Stores the provided JWT in `localStorage` under the `TOKEN_KEY`. It then dispatches a custom event named `authChange` on the `window` object. This event signals that the authentication state has changed, allowing other components (like `RootLayout`) to react accordingly.
    *   `logout(): void`: Removes the JWT associated with `TOKEN_KEY` from `localStorage`. It also dispatches the `authChange` event to signal the state change.
    *   `getToken(): string | null`: Retrieves the JWT from `localStorage` using `TOKEN_KEY`. Returns the token string if found, or `null` if not found or if not in a browser environment (where `localStorage` is unavailable).
    *   `isAuthenticated(): boolean`: Checks if a JWT exists in `localStorage` under `TOKEN_KEY`. Returns `true` if a token is present, `false` otherwise. This is used to determine if the user is currently considered authenticated on the client side.

*   **Event Dispatch**:
    *   Uses `window.dispatchEvent(new Event('authChange'))` after login and logout operations to notify other parts of the application (e.g., `RootLayout`) about changes in authentication state. This allows for dynamic UI updates or route protection logic.

*   **Contribution to Project**:
    This file provides the core client-side logic for JWT-based user authentication. It enables the application to:
    *   Persist user sessions across page loads using `localStorage`.
    *   Update the UI or application state dynamically when authentication status changes.
    *   Allow other parts of the application to check if a user is authenticated and to retrieve the current token.

## `lib/db.ts`

*   **Purpose**:
    Handles PostgreSQL database connectivity using a connection pool (`pg.Pool`) from the `pg` library. It provides a centralized way to manage connections and execute SQL queries.

*   **Key Components/Functions**:
    *   `getPool()`: Initializes and returns the singleton `Pool` instance. It configures the pool using the `POSTGRES_URL` environment variable. If this variable is not set (e.g., in development), it falls back to a default local connection string (`postgresql://flexbone_user:flexbone_password@localhost:5432/flexbone_db`) and issues a console warning. It also includes optional SSL configuration based on `process.env.NODE_ENV` and handles errors for idle clients in the pool.
    *   `query(text: string, params?: any[]): Promise<QueryResult<any>>`: An asynchronous function that executes a given SQL query string with optional parameters using a client from the connection pool. It logs a snippet of the executed query text, the time taken for execution, and the number of rows returned.
    *   `testConnection(): Promise<boolean>`: An optional utility function designed to test the database connection by executing a simple query (`SELECT NOW()`). It logs success or failure messages.

*   **Contribution to Project**:
    This file is crucial for all backend data operations. It provides:
    *   Centralized and efficient database connection management through a connection pool.
    *   A simple, consistent interface (`query` function) for performing database operations from API routes or other backend modules.
    *   Basic logging for query execution, aiding in debugging and monitoring.
    *   Configuration flexibility for different environments via `POSTGRES_URL` and sensible defaults for development.

## `lib/utils.ts`

*   **Purpose**:
    Provides general utility functions for the project. Currently, its primary utility is for constructing and merging CSS class names, which is particularly useful when working with Tailwind CSS.

*   **Key Functions**:
    *   `cn(...inputs: ClassValue[]): string`: This function takes multiple arguments (strings, arrays, or objects) and merges them into a single class name string. It leverages:
        *   `clsx`: A utility to conditionally construct class name strings based on the input values.
        *   `tailwind-merge`: A utility to intelligently merge Tailwind CSS classes, resolving conflicts and ensuring that the final class string is optimized and free of redundancies (e.g., merging `p-2` and `p-4` results in `p-4`).

*   **Contribution to Project**:
    This utility simplifies the process of applying dynamic and conditional styling in React components:
    *   Makes it easier to manage complex class name logic in JSX.
    *   Ensures that Tailwind CSS classes are applied correctly and predictably, avoiding conflicts.
    *   Promotes cleaner and more maintainable component code by abstracting class name construction.

## `lib/authUtils.ts`

*   **Purpose**:
    Provides server-side utility functions related to authentication, specifically for verifying JWTs.

*   **Key Functions**:
    *   `verifyAuthToken(authHeader: string | undefined | null): { userId: string } | null`:
        *   Takes an Authorization header string (e.g., "Bearer <token>").
        *   Checks for the presence and correct format of the header.
        *   Extracts the token part.
        *   Requires `process.env.JWT_SECRET` to be defined; otherwise, it logs an error and returns `null`.
        *   Uses `jwt.verify()` from the `jsonwebtoken` library to verify the token against the `JWT_SECRET`.
        *   If verification is successful and the decoded token contains a `userId` (string), it returns an object `{ userId: string }`.
        *   Handles errors like `TokenExpiredError` or `JsonWebTokenError` by logging them and returning `null`.
        *   Returns `null` if the token is invalid, expired, malformed, or if `userId` is not found in the payload.

*   **Contribution to Project**:
    This file is essential for securing API routes by providing a reusable function to:
    *   Validate authentication tokens sent by clients.
    *   Extract user identity (`userId`) from valid tokens.
    *   Centralize token verification logic, ensuring consistency across protected API endpoints.
    *   Handle common JWT errors gracefully.
    *   Emphasizes the critical dependency on the `JWT_SECRET` environment variable for secure operation.
