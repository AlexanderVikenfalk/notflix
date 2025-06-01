import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    useTitle('Page Not Found')

    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
                404
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link
                to="/"
                className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white transition"
            >
                Go to Home
            </Link>
        </main>
    )
}

export default NotFoundPage
