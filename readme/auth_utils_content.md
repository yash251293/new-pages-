```typescript
// lib/authUtils.ts
import jwt from 'jsonwebtoken';

// This utility relies on the JWT_SECRET environment variable being set.
// Ensure process.env.JWT_SECRET is available in your server environment.

/**
 * Verifies an Authorization header token and extracts the userId.
 *
 * @param authHeader The Authorization header string (e.g., "Bearer <token>").
 * @returns An object containing the userId if the token is valid, otherwise null.
 */
export function verifyAuthToken(
  authHeader: string | undefined | null
): { userId: string } | null {
  if (!authHeader) {
    console.log('[verifyAuthToken] No Authorization header provided.');
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('[verifyAuthToken] Authorization header format is not "Bearer <token>".');
    return null;
  }

  const token = parts[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('[verifyAuthToken] JWT_SECRET is not defined in environment variables. This is a critical server configuration issue.');
    return null;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && typeof decoded.userId === 'string') {
      return { userId: decoded.userId };
    } else {
      console.log('[verifyAuthToken] Token decoded, but userId is missing or not a string.');
      return null;
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log('[verifyAuthToken] Token expired:', err.message);
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.log('[verifyAuthToken] Invalid token:', err.message);
    } else {
      console.error('[verifyAuthToken] Error during token verification:', err);
    }
    return null;
  }
}
```
