# Notflix – Movie Search App

[![Vite](https://img.shields.io/badge/Vite-4.x-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4.svg)](https://tailwindcss.com/)

A responsive, accessible, and filterable movie search and details application built with modern React and TypeScript.

![App screenshot](public/docs/mockup.png)

## Features

-  Search movies with debounced input and URL-synced query
-  View detailed information on selected movies
-  Add/remove movies to a favorites list (with persistence)
-  Filter search results by genre, release year, and rating
-  Pagination with smooth scroll to top
-  Theme toggle (light/dark mode)
-  Loading with skeleton loader
-  Typed API services with error handling and mock support

## Tech Stack

- React 19 + TypeScript
- Vite + SWC
- Tailwind CSS
- React Router
- Context API + Hooks
- MSW (Mock Service Worker)
- ESLint + Prettier

## Setup

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview build locally**
   ```bash
   npm run preview
   ```

## Project Structure

```
notflix/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── svg/
│   └── mockServiceWorker.js
├── src/
│   ├── components/
│   │   ├── header/
│   │   ├── skeletons/
│   │   ├── pagination/
│   │   └── MovieCard.tsx
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── MovieListPage.tsx
│   │   ├── MovieDetailsPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── services/
│   │   └── movieService.ts
│   ├── types/
│   │   ├── api/
│   │   └── ui/
│   ├── utils/
│   └── App.tsx
├── tests/
│   ├── __mocks__/
│   ├── integration/
│   └── unit/
├── .eslintrc.json
├── jest.config.ts
├── tsconfig.json
├── tsconfig.test.json
├── vite.config.ts
├── README.md
└── package.json
```

## Notes

- Movie data is fetched from a mocked API using `msw` handlers.
- URL query parameters control search term and page number for shareable URLs.
- Errors are triggered twice due to invoking <request()/> inside <useEffect()/> hook while running in <StrictMode />. This is the intended behavior ([Read more here](https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state))
# Notflix – Movie Search and Details App

A responsive, performant movie search application built with React 18+. It allows users to search for movies, view detailed info, and save favorites. It uses a simulated mock API and focuses on clean architecture, state management with Context + useReducer, and performance optimizations.

---

## Features
A responsive, performant movie search application built with React 18+. It allows users to search for movies, view detailed info, and save favorites. It uses a simulated mock API and focuses on clean architecture, state management with Context + useReducer, and performance optimizations.
### Core

- Search movies by title
- View movie details including cast, director, release year, and genres
- Save/remove favorite movies with persistence (via localStorage)
- Pagination for search results
- Apply filters: genre, release date, rating
- Routing using React Router
- Unit tests with Jest
- Intregration Tests with React Testing Library
- E2E tests with Playwright

### UX

- Dark mode toggle
- Error boundaries and friendly error messages
- Loading states (spinner + skeletons)
- Accessible inputs and components

### Performance

- Debounced search input
- Memoized movie rendering (`useMemo`, `React.memo`)
- Lazy loading for routes via `React.lazy` and `Suspense`

---

## Tech Stack

| Tool                              | Purpose                                                                 |
|-----------------------------------|-------------------------------------------------------------------------|
| **React 18**                      | Core framework                                                         |
| **React Router DOM**              | Routing and nested layouts                                              |
| **Context API + useReducer**      | Global state management (favorites, search query, filters)          |
| **localStorage**                  | State persistence across reloads                                       |
| **Playwright**                    | End-to-end testing (headless and headed support)                       |
| **Jest + React Testing Library ** | Unit and integration testing                                          |
| **Tailwind CSS**                  | Utility-first styling                                                  |
| **Vite**                          | Fast bundler and dev server                                            |
| **MSW**                           | Mock Service Worker to simulate API requests                           |

---

## 📁 Project Structure

public/ # Static assets (favicon, index.html, etc.)
src/
├── assets/ # Images and static SVGs
│
├── components/ # Reusable UI components
│ ├── common/ # Generic UI elements like Button, Loader, etc.
│ ├── layout/ # App shell: Header, Footer, etc.
│ ├── movie/ # Movie-specific components like MovieCard, MovieGrid
│ └── search/ # Search UI: SearchInput, SearchFilters, etc.
│
├── constants/ # App-wide constants (e.g. filtering config)
│
├── contexts/ # React context logic (e.g. SearchContext, FavoritesContext)
│
├── hooks/ # Reusable custom React hooks (e.g. useApi, useTitle)
│
├── pages/ # Top-level route components (Home, Search, MovieDetails, Favorites)
│
├── services/ # Simulated API services and data fetching logic
│
├── styles/ # Global Tailwind setup and any additional styles
│
├── types/ # TypeScript types and interfaces
│
├── utils/ # Utility functions (e.g. localStorage helpers)
│
├── App.tsx # Root component (outlet, header, layout)
├── main.tsx # React root + router
├── router.tsx # Route definitions with lazy-loaded pages
│
└── index.css # Tailwind base imports

---

## 🛠 Requirements

- Node.js ≥ 18
- npm ≥ 9
- Modern browser (Chrome, Firefox, Safari)

---

## 🧪 Running Tests

To run Playwright tests in headed mode:

```bash
npx playwright test --project=chromium

To open the test UI:

npx playwright test --ui

🧱 Future Improvements

    Better image optimization: Use smaller poster sizes or progressive loading

    i18n support: Enable localization with react-i18next

    SEO enhancements: Add meta tags, structured data (e.g. schema.org)

    Switch to TanStack Query: For advanced caching and deduping

    Better A11y: Screen-reader-only headings and ARIA labels

    Testing:

        Unit test for search/filter utils

        Integration test for filters

        E2E: search, add to favorites, navigate

    Friendly URLs: Use movie slugs instead of numeric IDs

    Filter state in URL: Persist release date, rating, genre in query string

📝 Development Roadmap

See README.dev.md for phased checklist of features, known issues, and resolved tasks.
🧹 Known Issues

    Filtering doesn’t persist in URL

    Large image payload on initial load (poster sizes)

    Detail page re-fetches even when data unchanged (React Query could solve)

    Filters component could be split into subcomponents for maintainability

📦 Installation

git clone https://github.com/your-username/notflix.git
cd notflix
npm install
npm run dev

Visit http://localhost:5173.
🧪 Preview Build

Coming soon on Vercel or Netlify.
License

MIT – feel free to use and extend.

## Consideration
Choosing Schema for better SEO
Choosing MRW for mocking
Axios for netowkr requests
Tailwind for design

## Improvments
Improved image optimization - https://benhoneywill.com/progressive-image-loading-with-react-hooks/ (again… this is just a detail)
Data transformation with ZOD
React-query instead of Axios