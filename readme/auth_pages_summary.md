# Authentication Pages Analysis

This document provides an analysis of the authentication-related page components (`Login`, `Signup`, `Forgot Password`, `Reset Password`), focusing on their UI structure, form handling, API interactions, user feedback, and potential areas for improvement.

## `app/(auth)/auth/login/page.tsx`

*   **UI Structure & Components**:
    *   Uses `Card` for layout, with `CardHeader` (logo, title, description) and `CardContent`.
    *   Inputs for "Email" and "Password" with `Label` and `Input`.
    *   Password visibility toggle (`Eye`/`EyeOff` icons).
    *   Links for "Forgot password?" and "Sign up".
    *   "Sign in" `Button` for submission.
    *   Gradient background, centered card layout.

*   **User Input & Form Submission**:
    *   `formData` (`email`, `password`) managed by `React.useState`.
    *   `handleChange` updates `formData`.
    *   `handleSubmit` (async) triggered by `onSubmit`.
    *   `isLoading` state for visual feedback during API calls.

*   **API Interaction**:
    *   `POST` request to `/api/auth/login` with `formData`.
    *   `Content-Type: application/json`.

*   **API Response Handling & User Feedback**:
    *   **Success**:
        *   Parses JSON response, expects `data.token`.
        *   Calls `login(data.token)` from `lib/authClient` to store the token in `localStorage`.
        *   Displays a success `toast()` notification (e.g., "Login Successful").
        *   Redirects to `/explore` using `router.push()`.
        *   If `data.token` is missing, an error `toast()` is shown.
    *   **Error**:
        *   Attempts to parse error JSON.
        *   Displays an error `toast()` with the message.
    *   Generic catch block also uses error `toast()`.
    *   Submit button text changes to "Signing in..." when `isLoading`.

*   **Client-Side Validation & State Management**:
    *   **State**: `showPassword`, `formData`, `isLoading`, `isCheckingAuth`.
    *   **Validation**: HTML5 `required` attribute.
    *   **Authentication Check**: `useEffect` hook checks if the user is already authenticated using `isAuthenticated()` from `lib/authClient`. If so, it redirects to `/feed` to prevent already logged-in users from seeing the login page.

*   **Potential Issues & Improvements**:
    *   **Client-Side Validation**: Add client-side validation for email format.
    *   **Error Display**: Consider displaying specific error messages inline with form fields for better UX, in addition to toasts.

## `app/(auth)/auth/signup/page.tsx`

*   **UI Structure & Components**:
    *   Similar UI to Login page (`Card`, `Label`, `Input`, `Button`).
    *   Fields: "First Name", "Last Name", "Email", "Password", "Confirm Password".
    *   Password and Confirm Password fields have visibility toggles.
    *   Displays password strength validation criteria (`Check`/`X` icons).
    *   Link to login page.

*   **User Input & Form Submission**:
    *   `formData` managed via `React.useState`.
    *   `handleChange` updates `formData` and `passwordValidation` state.
    *   `handleSubmit`:
        *   Prevents default.
        *   Client-side check: if `formData.password` !== `formData.confirmPassword`, shows an error `toast()` and returns.
        *   Sets `isLoading` true.
        *   `POST` request to `/api/auth/signup`.

*   **API Interaction**:
    *   `POST` request to `/api/auth/signup` with `firstName`, `lastName`, `email`, `password`.
    *   `Content-Type: application/json`.

*   **API Response Handling & User Feedback**:
    *   **Success**:
        *   Parses JSON response.
        *   Shows a success `toast()` (e.g., "Signup Successful").
        *   Redirects to `/explore`.
    *   **Error**:
        *   Attempts to parse error JSON.
        *   Shows an error `toast()` with the message.
    *   Generic error handling also uses error `toast()`.
    *   Submit button text changes to "Creating account..." when `isLoading`.
    *   Visual feedback for password strength and match.

*   **Client-Side Validation & State Management**:
    *   **State**: `showPassword`, `showConfirmPassword`, `formData`, `isLoading`, `passwordValidation`.
    *   **Validation**:
        *   Compares `password` and `confirmPassword`.
        *   Dynamically validates password strength criteria.
        *   Submit button disabled based on `isLoading`, `isPasswordValid`, or password mismatch.
        *   HTML5 `required` attribute.

*   **Potential Issues & Improvements**:
    *   **Redirection after Signup**: Default success message is "Please check your email to verify your account." Redirecting to `/explore` might be fine, but ensure the overall UX for email verification (if fully implemented) is clear.
    *   **Zod/React Hook Form**: For more complex forms, consider `react-hook-form` with Zod for streamlined state management and validation.

## `app/(auth)/auth/forgot-password/page.tsx`

*   **UI Structure & Components**:
    *   Uses `Card`.
    *   **Initial View**: Email input, "Send reset link" button, "Back to sign in" link.
    *   **Submitted View**: If `message` state is set (after API call), it shows the message (success or error) and options to "Try again" or "Back to sign in".

*   **User Input & Form Submission**:
    *   `email` managed via `React.useState`.
    *   `handleSubmit`:
        *   Prevents default, sets `isLoading` true.
        *   Makes a `POST` request to `/api/auth/request-password-reset` with the email.

*   **API Interaction**:
    *   `POST` request to `/api/auth/request-password-reset`.

*   **API Response Handling & User Feedback**:
    *   Sets `message` state based on API response (success or error).
    *   Displays the `message` to the user.
    *   Button text changes to "Sending..." when `isLoading`.
    *   **Important**: This page still contains `alert()` calls for client-side validation errors (empty email) and for API/unexpected errors. These need to be replaced with `toast()` notifications. (Tracked in `TODO_fix_alerts_in_forgot_password.md`).

*   **Client-Side Validation & State Management**:
    *   **State**: `email` (string), `isLoading` (boolean), `message` (string).
    *   **Validation**: Checks if email is empty using an `alert()`. HTML5 `required` attribute.

*   **Potential Issues & Improvements**:
    *   **User Feedback**: **Replace remaining `alert()` calls with `toast()` notifications.**
    *   **Client-Side Validation**: Add email format validation client-side before submission.

## `app/(auth)/auth/reset-password/page.tsx`

*   **UI Structure & Components**:
    *   Uses `Card`.
    *   Inputs for "New Password" and "Confirm New Password".
    *   Password visibility toggles.
    *   "Reset Password" button.
    *   Displays success or error messages inline based on `message` state.

*   **User Input & Form Submission**:
    *   `password`, `confirmPassword` managed via `React.useState`.
    *   `token` is retrieved from URL query parameters using `useSearchParams()` from `next/navigation`.
    *   `handleSubmit`:
        *   Prevents default, sets `isLoading` true.
        *   Validates if passwords match and if password is not empty.
        *   Makes a `POST` request to `/api/auth/reset-password` with `token`, and `newPassword`.

*   **API Interaction**:
    *   `POST` request to `/api/auth/reset-password`.

*   **API Response Handling & User Feedback**:
    *   Sets `message` state (string, includes type like 'success' or 'error') based on API response.
    *   Displays this message inline within the UI (e.g., green text for success, red for error). Does not use `toast()` or `alert()`.
    *   Redirects to `/auth/login` on successful password reset after a short delay.
    *   Button text changes to "Resetting..." when `isLoading`.

*   **Client-Side Validation & State Management**:
    *   **State**: `token`, `password`, `confirmPassword`, `message`, `isLoading`, `showPassword`, `showConfirmPassword`.
    *   **Validation**:
        *   Checks if token exists from URL.
        *   Checks if password and confirm password match.
        *   Checks if password field is empty.
        *   Password complexity/strength rules are not enforced client-side beyond being non-empty, but API enforces min 8 characters.

*   **Potential Issues & Improvements**:
    *   **User Feedback Consistency**: Consider using `toast()` notifications for consistency with other auth pages, though inline messages are also acceptable.
    *   **Client-Side Password Strength**: Add client-side visual feedback for password strength if desired.

---

**General Observations for All Auth Pages**:

*   **UI Consistency**: Good use of shared UI components.
*   **State Management**: Primarily `React.useState`.
*   **User Feedback**: Transitioning from `alert()` to `toast()` notifications is mostly complete, with `forgot-password` page being the main exception. `reset-password` uses inline messages.
*   **API Integration**: All pages use `fetch`.
*   **Error Handling**: Generally involves parsing JSON and showing messages.
*   **Security**: Relies on API for security measures. Client-side tokens are handled by `lib/authClient.ts`.
