# Hooks Summary

This document summarizes the purpose, functionality, and potential usage of custom React hooks found in the `hooks/` directory.

## `hooks/use-mobile.tsx` (Exported as `useIsMobile`)

*   **Hook Name**: `useIsMobile`
*   **Purpose**:
    This hook is designed to detect whether the current browser viewport width is below a defined mobile breakpoint, effectively determining if the user is on a "mobile" sized screen.

*   **How it Works**:
    1.  **Breakpoint Definition**: A constant `MOBILE_BREAKPOINT` is set to `768` pixels.
    2.  **State Management**: It uses `React.useState<boolean | undefined>(undefined)` to store the `isMobile` status. It's initialized to `undefined` to represent an unknown initial state before the effect runs.
    3.  **Effect Hook (`React.useEffect`)**:
        *   On component mount, it performs the following:
            *   Creates a media query object using `window.matchMedia(\`(max-width: ${MOBILE_BREAKPOINT - 1}px)\`)`. This query checks if the viewport width is less than 768px.
            *   Defines an `onChange` handler that updates the `isMobile` state by checking `window.innerWidth < MOBILE_BREAKPOINT`.
            *   Adds this `onChange` handler as an event listener to the media query's "change" event. This means `isMobile` will be updated whenever the viewport width crosses the breakpoint.
            *   Immediately sets the `isMobile` state based on the current `window.innerWidth` to ensure the correct value is set on initial client-side render.
            *   The effect returns a cleanup function that removes the event listener (`mql.removeEventListener("change", onChange)`) when the component unmounts, preventing memory leaks.
    4.  **Return Value**: The hook returns `!!isMobile`. The double negation (`!!`) coerces the `isMobile` state (which could be `undefined` initially or during server-side rendering if not careful) to a boolean (`true` or `false`). Effectively, it returns `false` before the `useEffect` hook runs on the client.

*   **Potential Usage**:
    *   **Responsive Layouts**: Conditionally render different UI components or layouts based on screen size. For example, displaying a compact hamburger menu on mobile and a full navigation bar on desktop.
    *   **Style Adjustments**: Dynamically apply different styles or classes.
    *   **Behavioral Changes**: Modify component behavior; for instance, changing touch interactions or data fetching strategies for mobile users.
    *   Used in any component that needs to adapt its appearance or functionality for mobile screens.

## `hooks/use-toast.ts`

*   **Purpose**:
    This file provides a custom hook (`useToast`) and a utility function (`toast`) for managing and displaying toast notifications (small, non-modal pop-up messages) in a React application. It is marked with `"use client"`, indicating it's intended for client-side rendering. The system is inspired by libraries like `react-hot-toast`.

*   **How it Works**:
    1.  **Global State (`memoryState`)**: A global variable `memoryState` stores the array of active toasts (`{ toasts: [] }`). This state is shared across all components using the hook.
    2.  **Listeners**: A `listeners` array holds callback functions from components that use `useToast`. When the `memoryState` changes, these listeners are called to update the components.
    3.  **Reducer (`reducer`)**: A pure function that defines how the toast state changes in response to actions:
        *   `ADD_TOAST`: Adds a new toast to the `toasts` array. It respects `TOAST_LIMIT`.
        *   `UPDATE_TOAST`: Updates properties of an existing toast.
        *   `DISMISS_TOAST`: Marks a toast (or all toasts if no `toastId` is provided) as not `open`. It then uses `addToRemoveQueue` to schedule its actual removal from the state after `TOAST_REMOVE_DELAY`.
        *   `REMOVE_TOAST`: Removes a toast from the `toasts` array.
    4.  **`addToRemoveQueue`**: Manages timeouts (`toastTimeouts`) to remove toasts from the state after `TOAST_REMOVE_DELAY`.
    5.  **`dispatch(action: Action)`**: This function takes an action, updates `memoryState` using the `reducer`, and then calls all registered `listeners` with the new state.
    6.  **`toast({ ...props }: Toast)` function**:
        *   This is the primary function used to create and show a new toast.
        *   It generates a unique `id` for the toast.
        *   It dispatches an `ADD_TOAST` action with the toast's properties, including an `onOpenChange` callback. This callback ensures that if the toast is closed by the UI component itself (e.g., via a close button), it triggers the `dismiss` logic.
        *   Returns an object `{ id, dismiss, update }` allowing imperative control over the displayed toast.
    7.  **`useToast()` hook**:
        *   Subscribes the component to global toast state changes. It uses `React.useState(memoryState)` to hold the local copy of the toast state.
        *   `React.useEffect` adds the component's `setState` function to the `listeners` array on mount and removes it on unmount. This ensures the component re-renders when the global toast state changes.
        *   Returns an object containing:
            *   The current `toasts` array from `memoryState`.
            *   The `toast` function (to create new toasts).
            *   A `dismiss` function (to dismiss toasts by ID or all toasts).

*   **Key Constants**:
    *   `TOAST_LIMIT = 1`: Only one toast message can be displayed at a time. Older toasts are likely replaced or managed according to this limit.
    *   `TOAST_REMOVE_DELAY = 1000000`: A very long delay (1,000,000 ms = 1000 seconds) before a toast is actually removed from the state after being "dismissed" (hidden). This suggests toasts are primarily visually dismissed and their state is kept for an extended period, possibly for animation purposes or to allow for potential undismiss actions if the system were extended.

*   **Exports**:
    *   `useToast` (hook)
    *   `toast` (utility function)

*   **Potential Usage**:
    *   Displaying feedback to users after actions like form submissions (e.g., "Profile updated successfully!").
    *   Showing error messages (e.g., "Failed to load data.").
    *   Providing warnings or informational alerts.
    *   The `toast` function can be imported and called from event handlers, API call callbacks, or anywhere in client-side application logic.
    *   Requires a separate `Toaster` UI component (e.g., from `@/components/ui/toaster` which uses this hook) to actually render the toasts based on the state.

[end of hooks_summary.md]
