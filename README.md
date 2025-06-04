# Notflix – Movie Search App

[![Vite](https://img.shields.io/badge/Vite-4.x-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4.svg)](https://tailwindcss.com/)

A responsive, accessible, and filterable movie search and details application built with modern React and TypeScript.

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

## Consideration
Choosing Schema for better SEO
Choosing MRW for mocking
Axios for netowkr requests
Tailwind for design

## Improvments
Improved image optimization - https://benhoneywill.com/progressive-image-loading-with-react-hooks/ (again… this is just a detail)
Data transformation with ZOD
React-query instead of Axios