import { useFavorites } from '@/context/FavoritesContext'
import { MovieCard } from '@/components/movie/MovieCard'
import { useTitle } from '@/hooks/useTitle'
import type { MovieSearchResult } from '@/types/api/movie'

const FavoritesPage = () => {
    const { favorites } = useFavorites()
    useTitle('My Favorites')

    return (
        <main className="min-h-screen">
            <h2 className="text-2xl font-bold text-center my-6 text-gray-800 dark:text-white">
                My Favorites
            </h2>
            <section className="max-w-7xl mx-auto py-7">
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        You haven’t added any favorites yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                        {favorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie as MovieSearchResult}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default FavoritesPage
