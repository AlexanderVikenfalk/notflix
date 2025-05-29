import { createBrowserRouter } from 'react-router-dom';
import  App  from "./App"
import { MovieDetailsPage, FavoritesPage, MovieListPage, NotFoundPage } from './pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <MovieListPage /> },
            { path: 'movie/:id', element: <MovieDetailsPage /> },
            { path: 'favorites', element: <FavoritesPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);
