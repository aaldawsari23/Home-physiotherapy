# GEMINI.md

## Project Overview

This is a comprehensive, modernized home healthcare management system built specifically for King Abdullah Hospital in Bisha. It provides a unified and optimized interface for managing patient files and medical notes with a focus on performance and simplicity.

The project is built with **React 19** and **TypeScript**, using **Vite** as a build tool. It features a **mobile-first design** and **offline capability** through the use of **IndexedDB**. The application supports role-based access for different healthcare professionals and is available in both Arabic and English.

## Building and Running

### Prerequisites

*   Node.js 18+ and npm
*   Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation and Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### Building for Production

1.  **Build the application:**
    ```bash
    npm run build
    ```
2.  **Preview the production build:**
    ```bash
    npm run preview
    ```

### Testing

*   **Run tests:**
    ```bash
    npm run test
    ```
*   **Run tests with UI:**
    ```bash
    npm run test:ui
    ```

## Development Conventions

*   **State Management:** The project uses a combination of React Context and the `useReducer` hook for state management.
*   **Styling:** The project uses a combination of custom CSS and utility classes.
*   **Data Management:** The application uses an "offline-first" approach, with all data stored locally in IndexedDB. The `src/data/local/repo.ts` file contains the logic for interacting with the database.
*   **Autosave:** The `useAutosave` hook in `src/hooks/useAutosave.ts` provides a debounced autosave functionality to automatically save changes made by the user.
*   **Build Optimizations:** The `vite.config.ts` file is configured to optimize the build by splitting the code into chunks for vendor libraries, forms, print components, and core utilities.
*   **Aliases:** The project uses aliases for cleaner imports (e.g., `@components`, `@utils`).
*   **Environment Variables:** The application uses environment variables for configuration. A `.env.local.example` file is provided as a template.
