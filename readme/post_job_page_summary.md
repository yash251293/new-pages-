# `app/post-job/page.tsx` - Post a New Job Page Analysis

This document provides an analysis of the "Post a New Job" page (`app/post-job/page.tsx`), focusing on its purpose, UI structure, form handling, API interactions, and potential areas for improvement.

## 1. Purpose

The primary purpose of this page is to allow authenticated users to create new general (non-freelance) job postings. It provides a comprehensive form to input all necessary job details, including company information (by searching for an existing company or creating a new one), job role specifics, salary, and application method.

## 2. UI Structure & Components

*   **Overall Layout**:
    *   Page header with a "Back to jobs" link and title "Post a New Job".
    *   The form is organized into logical sections using `Card` components from shadcn/ui:
        *   Company Information
        *   Job Details
        *   Skills & Experience
        *   Salary & Application
    *   Action buttons ("Save as Draft", "Post Job") are at the bottom.

*   **Key shadcn/ui Components Used**:
    *   `Button`: For navigation, actions, and form submission.
    *   `Input`: For text fields like job title, location, company search, skills (comma-separated).
    *   `Textarea`: For multi-line text fields like job description, responsibilities, requirements, benefits.
    *   `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`: For dropdowns like Job Type, Experience Level, Salary Currency, Salary Period.
    *   `RadioGroup`, `RadioGroupItem`: For selecting Application Method (Email vs. URL).
    *   `Label`: For form field labels.
    *   `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardDescription`: For structuring form sections.
    *   `Popover`, `PopoverContent`, `PopoverTrigger` with `Calendar` (from `react-day-picker`): For Application Deadline date picker.
    *   `Dialog` (via `CreateCompanyModal.tsx`): For creating a new company.
    *   Icons from `lucide-react` are used throughout.

*   **Form Management**:
    *   The form is built using `react-hook-form` for state management, validation, and submission.
    *   Client-side validation is implemented using `zod` and `@hookform/resolvers/zod`.

## 3. Key Features

*   **Company Search/Creation**:
    *   **Search**: An `Input` field allows users to search for existing companies. Search is debounced and triggers a `GET /api/companies` API call. Results are displayed in a dropdown list.
    *   **Selection**: Selecting a company from the search results populates a hidden `companyId` field in the form and displays the selected company name.
    *   **Creation**: A "Create New Company" `Button` opens the `CreateCompanyModal.tsx`.
        *   **`CreateCompanyModal.tsx`**: This modal contains a separate `react-hook-form` instance and Zod schema for company fields (name, website, logo, industry, description). It submits to `POST /api/companies`.
        *   Upon successful company creation, the modal calls an `onCompanyCreated` callback, which updates the main form with the new company's ID and name.
*   **Comprehensive Form Fields**:
    *   **Job Basics**: Title, Location, Job Type.
    *   **Detailed Descriptions**: Job Description, Responsibilities, Requirements, Benefits (using `Textarea`).
    *   **Role Specifics**: Experience Level.
    *   **Skills Input**: A simple `Input` field for comma-separated skills. The string is parsed into an array before API submission.
    *   **Salary Information**: Min/Max Salary, Currency, Period.
    *   **Application Process**:
        *   Method selection (Email or URL) using `RadioGroup`.
        *   Conditional display of `applicationEmail` or `applicationUrl` input fields based on the selected method (managed by `watch` from `react-hook-form`).
        *   Optional Application Deadline using a `DatePicker`.
*   **Client-Side Validation**:
    *   All fields are validated according to the Zod schema defined in the component.
    *   Includes required field checks, string length minimums, number positivity, URL/email formats.
    *   Custom refinements: `salaryMax >= salaryMin`, and conditional requirement for `applicationEmail`/`applicationUrl`.
    *   Error messages are displayed below respective fields.

## 4. Form Submission

*   **API Endpoint**: Submits data to `POST /api/jobs`.
*   **Data Transformation**:
    *   The comma-separated `skills` string is converted into an array of strings.
    *   `applicationDeadline` (if provided) is formatted to an ISO string.
    *   The `companyNameDisplay` field is not sent; only `companyId`.
*   **Submission Types**:
    *   **"Post Job" Button**: Triggers the main `onSubmit` handler, which sets the job `status` to "Open".
    *   **"Save as Draft" Button**: Triggers the same `onSubmit` handler but passes a flag to set the job `status` to "Draft". (Note: The current Zod schema applies all validations even for drafts; a more advanced implementation might have a separate, more lenient schema for drafts if the API supports partial saves).
*   **Authentication**: Requires the user to be authenticated. `getToken()` from `@/lib/authClient` is used to retrieve the token, which is included in the `Authorization` header of the API request. If no token, submission is prevented.

## 5. User Feedback

*   **Loading States**: The "Post Job" and "Save as Draft" buttons show a loading state (e.g., "Posting Job...") and are disabled during API submission (`isSubmitting` from `react-hook-form`).
*   **Toast Notifications**: Uses `sonner` (`toast`) to provide feedback for:
    *   Authentication requirement if the token is missing.
    *   Initiation of submission ("Posting job...", "Saving draft...").
    *   Successful job posting or draft saving.
    *   Errors during submission (API errors or unexpected client-side errors).
*   Form validation errors are displayed inline below each field.

## 6. Authentication

*   The page implicitly requires authentication for its core actions (company search/create, job posting).
*   `getToken()` is used to fetch the auth token for API calls. Actions are prevented if no token is found.

## 7. Potential Issues & Improvements

*   **Skills Input**: The comma-separated text input for skills is basic. A more user-friendly tag input component would be a significant improvement.
*   **Rich Text Editors**: For fields like "Description", "Responsibilities", etc., a rich text editor could allow for better formatting.
*   **Draft Lenience**: For "Save as Draft", the current implementation uses the same Zod schema as "Post Job". A true draft system might allow saving with fewer required fields, which would necessitate a different (more lenient) Zod schema for draft submissions and API support for partial data.
*   **Company Search UX**: The company search results dropdown is basic. Could be enhanced with better styling or debouncing on the API call itself if not just client-side.
*   **File Attachments for Job Posting**: The main job posting form does not currently include file attachments, unlike the freelance posting form. This could be added if relevant.
*   **Global Error Handling/Notifications**: While toasts are used, a more centralized error display system could be beneficial for complex errors.

This page provides a robust interface for creating detailed job postings, integrating company management, and offering essential user feedback.
