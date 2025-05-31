import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'

const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const MovieListPage = lazy(() => import('./pages/MovieListPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MovieListPage />,
            },
            {
                path: 'movie/:id',
                element: <MovieDetailsPage />,
            },
            {
                path: 'favorites',
                element: <FavoritesPage />,
            },
            {
                path: 'search',
                element: <SearchResultsPage apiPath="search/movie" />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])
