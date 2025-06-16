# Notflix – Movie Search and Details App
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4.svg)](https://tailwindcss.com/)

#### A responsive, accessible, and filterable movie search and details application built with modern React and TypeScript.
![App screenshot](public/docs/mockup.png)
---
# About The Project
## Project Structure

```
notflix/
├── public/                     # Static assets (e.g. mock data, images, favicon)
├── src/
│   ├── assets/                 # Icons, SVGs, and images used in the app
│   ├── components/             # Reusable UI components (e.g. Button, Loader)
│   ├── contexts/               # React Context providers (e.g. FavoritesContext, SearchContext)
│   ├── hooks/                  # Custom React hooks (e.g. useDebounce, useFilters)
│   ├── pages/                  # Top-level route components (Home, SearchResults, MovieDetails, Favorites)
│   ├── services/               # API logic and mock handlers (e.g. movieService, msw handlers)
│   ├── types/                  # TypeScript type definitions and interfaces
│   ├── utils/                  # Utility functions and helpers (e.g. formatting, constants)
│   ├── tests/                  # Unit tests (Jest)
│   ├── playwright/             # End-to-end tests (Playwright)
│   └── main.tsx                # Application entry point
```
---

## Main Technologies & Design Decisions

### React 19
The app is built with modern React using functional components and hooks like `useEffect`, `useReducer`, `useContext` and `useMemo`.

### React Router v6+
Routing is handled via `react-router-dom`. The app includes:
- Home page with movie list
- SearchResults page with filters
- MovieDetails page
- Favorites page

### Tailwind CSS
Utility-first CSS via Tailwind 4 is used for styling. This allows for rapid prototyping and consistent theming (including dark mode).
It was chosen for its utility-based approach and seamless dark/light mode integration.

### Context API + useReducer
Used to manage global state for Favorites and Search Filters. Alternatives like Redux or Zustand were intentionally skipped to keep dependencies minimal.

### LocalStorage
Favorites and theme preferences are persisted with localStorage for improved user experience.

### Axios
Selected for its lightweight syntax and simplicity for handling network requests.

### MSW (Mock Service Worker)
Used to mock API responses and decouple the UI from a live backend.

### Testing Setup
- **Jest + React Testing Library**: For unit tests. (located in the /components structure per feature e.g /components/layout/__tests__)
- **Playwright**: For end-to-end tests (located in `playwright/`, files suffixed with `.playwright.test.ts` to avoid Jest conflict).

---

## Features

- Movie search (debounced, paginated)
- View full movie details
- Add/remove movies from favorites
- Persist favorites across reloads
- Responsive UI with dark mode support
- Pagination & advanced search filters
- Error handling & loading states
- 404 Not Found page

---

## Improvements If Time Allowed

### Functionality & UX

- Use slugs in URLs for friendlier paths (`/movie/inception` instead of `/movie/123`)
- Progressive image loading (e.g., lazy load + blur)
- i18n for supporting multiple languages
- Use a real endpoint like [TMDB](https://developer.themoviedb.org/docs/getting-started) instead of mocked responses

### Dev Experience

- Use TanStack Query for smarter data fetching (staleTime, retries)
- Split large components into smaller ones (e.g., SearchFilterPanel)
- Store only movie IDs in favorites instead of full objects (improves memory usage and speed)
- Optionally use a state manager like `jotai` for certain contexts
- [ZOD](https://zod.dev/) for creating runtime type safety and for transforming to and from backend data structure.

### Styling & Assets

- Optimize and compress large images
- Ensure consistent loader size and grid layout
- Add view transition animations using [View Transitions](https://css-tricks.com/toe-dipping-into-view-transitions/)

### Testing
- Add integration tests
- Add more unit tests 
- Add more E2E tests
- Improve CI setup for cross-browser testing (headless & headed)

---
# Getting Started
## Prerequisites
- Node.js ≥ 18
- Package Manager: `yarn` or `npm` 
- Modern browser (Chrome, Firefox, Safari)

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/AlexanderVikenfalk/notflix.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
   OR
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   yarn run dev
   ```
   OR
   ```sh
   npm run dev
   ```
4. Open the local server address in your browser

### Run Tests

```bash
yarn test              # Jest / React Testing Library
yarn test:watch
yarn test:coverage

yarn playwright test          # Playwright (E2E)
yarn playwright test --ui     # Headed mode
```

# Contact
Alexander Vikenfalk – [LinkedIn](https://www.linkedin.com/in/alexander-vikenfalk/)