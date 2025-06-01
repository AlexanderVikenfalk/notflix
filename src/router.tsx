import { lazy, Suspense, type ReactElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import CircularProgress from '@mui/material/CircularProgress'

const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const MovieListPage = lazy(() => import('./pages/MovieListPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))

const withSuspense = (Component: ReactElement) => (
    <Suspense
        fallback={
            <div className="flex justify-center py-10">
                <CircularProgress size="3rem" />
            </div>
        }
    >
        {Component}
    </Suspense>
)
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: withSuspense(<MovieListPage />),
            },
            {
                path: 'movie/:id',
                element: withSuspense(<MovieDetailsPage />),
            },
            {
                path: 'favorites',
                element: withSuspense(<FavoritesPage />),
            },
            {
                path: 'search',
                element: withSuspense(<SearchResultsPage />),
            },
            {
                path: '*',
                element: withSuspense(<NotFoundPage />),
            },
        ],
    },
])
