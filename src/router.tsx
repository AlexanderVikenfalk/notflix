import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import {
    MovieDetailsPage,
    FavoritesPage,
    MovieListPage,
    NotFoundPage,
    SearchResultsPage,
} from './pages'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <MovieListPage title="Popular" apiPath="movie/popular" />
                ),
            },
            { path: 'movie/:id', element: <MovieDetailsPage /> },
            { path: 'favorites', element: <FavoritesPage /> },
            {
                path: 'search',
                element: <SearchResultsPage apiPath="search/movie" />,
            },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
])
