# Profile Pages Analysis

This document provides an analysis of the profile-related page components: the main profile view (`app/profile/page.tsx`) and the profile completion/editing form (`app/profile/complete/page.tsx`).

## `app/profile/page.tsx` (Main Profile View)

*   **UI Structure & Components**:
    *   The page displays a comprehensive user profile, wrapped in `<ProtectedRoute>`.
    *   Layout:
        *   Header `Card`: Cover photo area, `Avatar`, user name, headline, location, contact icons (`Mail`, `Phone`, `Globe`), and static user stats (connections, profile views with `Users`, `Eye` icons).
        *   Two-column grid:
            *   **Left Column**: `Card`s for "About", "Experience" (with `Briefcase`), "Education" (with `GraduationCap`), and "Projects". "Edit" / "Add" buttons link to `/profile/complete`.
            *   **Right Column**: `Card`s for "Skills", "Certifications" (with `Award`), "Languages", and "Recommendations".
    *   Utilizes UI components from `@/components/ui/` and `lucide-react` icons.

*   **Data Fetching & Display**:
    *   **Dynamic Data**: This page now **fetches and displays dynamic data** from the `/api/profile` endpoint using `useEffect` and an authentication token (`getToken` from `lib/authClient`).
    *   **Displayed Dynamic Fields**: Information such as avatar (`profile_picture_url`), name (`first_name`, `last_name`), headline, location, email (from `users` table), phone, website (`website_url`), bio, work experience, education, and skills (name and proficiency level) are populated from the API response.
    *   **Static Placeholders**: Several sections **remain static placeholders** as the API currently does not provide data for them. These include:
        *   "Projects" section.
        *   "Certifications" section.
        *   "Languages" section.
        *   "Recommendations" section.
        *   User statistics in the header card (Connections, Profile Views).
    *   **Loading/Error States**: The page handles loading states (displaying a "Loading profile..." message) and error states (displaying an error message if data fetching fails).

*   **API Interaction**:
    *   Makes a `GET` request to `/api/profile` using `fetch` with an `Authorization: Bearer <token>` header to retrieve user profile data.

*   **Potential Issues & Improvements**:
    *   **Integrate Static Sections**: API and frontend need to be updated to fetch and display data for the currently static sections (Projects, Certifications, Languages, Recommendations, user stats).
    *   **Skills Display**: The display of skills (name and proficiency) is basic. Could be enhanced with better visual representation of proficiency levels if desired.
    *   **Componentization**: For repeated list items (experience, education), consider sub-components for clarity.
    *   **"Edit"/"Add" Links**: Ensure these links correctly navigate to specific sections or pre-fill parts of the `/profile/complete` form if possible.

## `app/profile/complete/page.tsx` (Profile Completion/Editing Form)

*   **UI Structure & Components**:
    *   A multi-step form for creating or updating a user's profile, wrapped in `Card`.
    *   Features a step indicator (`currentStep` of `totalSteps`) and a progress bar.
    *   "Previous" and "Next" buttons for navigation; "Submit Profile" on the final step.
    *   Steps:
        1.  **Personal Details**: `Avatar` (with image preview and upload functionality), bio, location, website, phone.
        2.  **Skills & Expertise**: Input for adding skills, display of added skills as `Badge`s (removable).
        3.  **Professional Experience**: Dynamically added/removed `Card`s for each experience item (title, company, location, dates, description, current job checkbox).
        4.  **Educational Background**: Similar dynamic `Card`s for education items.
        5.  **Career Preferences**: `Select` inputs for job type, experience level, remote work; dynamic `Badge`s for industries.
    *   Uses `lucide-react` icons and various `components/ui/` elements.

*   **Data Fetching & Display (Pre-fill)**:
    *   Uses `useEffect` on mount to **fetch existing profile data from `/api/profile` (GET)** using an auth token (`getToken` from `lib/authClient`).
    *   An `isFetchingProfile` state manages a loading indicator ("Loading profile...") while initial data is fetched.
    *   Fetched data populates the `profileData` state, pre-filling the form fields for editing. Includes logic to ensure `experience` and `education` arrays have default items if empty.

*   **User Input & Form Submission**:
    *   Manages a complex `profileData` state object (currently typed as `any`).
    *   `handleInputChange`, `handleArrayChange`, `addSkill`, `removeSkill`, etc., manage form state updates.
    *   **Image Upload**:
        *   Handles image file selection via a hidden input.
        *   Displays a preview of the selected image (`profilePicturePreview`).
        *   On main form submission (`handleSubmit`), if a new image (`selectedImageFile`) is present, it's first uploaded to `/api/upload-avatar` via a separate `POST` request (using `FormData`).
        *   The URL returned from `/api/upload-avatar` then updates `finalProfileData.profilePicture` before the main profile data is submitted.
    *   **Main Profile Submission**: `handleSubmit` sends the `finalProfileData` (including the potentially updated avatar URL) via a `POST` request to `/api/profile`.

*   **API Interaction**:
    *   `GET /api/profile`: To fetch existing data for pre-filling (uses auth token).
    *   `POST /api/upload-avatar`: For uploading the profile picture (does not explicitly pass token in header, typically relies on session/cookies if securing this specific dev-only endpoint, or would need token if it were a production-ready secure endpoint).
    *   `POST /api/profile`: To submit all profile data (uses auth token in `Authorization` header).

*   **User Feedback**:
    *   Uses `toast()` notifications (updated from previous `alert()` calls) for success or error messages during profile submission and image upload failures.
    *   Loading states for initial data fetch ("Loading profile...") and final submission ("Submitting...").

*   **Potential Issues & Improvements**:
    *   **State Typing**: **Strongly recommend replacing `profileData: any` with a well-defined TypeScript interface/type** for improved type safety, autocompletion, and maintainability.
    *   **Client-Side Validation**: Implement comprehensive client-side validation (e.g., using Zod with `react-hook-form`) for better UX and data integrity before API submission.
    *   **Date Inputs**: Standard `type="month"` inputs are used. For enhanced UX and consistency, consider custom calendar components (e.g., from `components/ui/calendar`).
    *   **Error Handling**: While toasts are used, ensure detailed error messages are provided for specific field issues if the API supports it. Error handling for the initial data fetch could also be more explicit to the user.
    *   **Image Upload Security (Production)**: The current `/api/upload-avatar` is for development. For production, this would need to be replaced with a robust solution (e.g., direct upload to cloud storage with signed URLs).
    *   **Modularization**: The main state and handler functions are extensive. Consider custom hooks or context for managing parts of the form state or repeated logic if complexity grows.
