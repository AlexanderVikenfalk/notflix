import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '@/hooks/useApi'
import { useTitle } from '@/hooks/useTitle'
import { getMovieById } from '@/services/movieService'
import { FavoritesToggle } from '@/components/movie/FavoritesToggle'
import { MovieDetailsSkeleton } from '@/components/skeletons/MovieDetailsSkeleton'
import type { MovieDetails } from '@/types/api/movie'

const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data, request, loading } = useApi(getMovieById)

    useEffect(() => {
        if (id) {
            request(id)
        }
    }, [id])

    const movie = data as MovieDetails | null
    useTitle(movie?.title || 'Loading...')

    if (loading || !movie) {
        return <MovieDetailsSkeleton />
    }

    return (
        <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <img
                        src={
                            movie.poster_path ||
                            '/assets/images/placeholder.webp'
                        }
                        alt={movie.title}
                        className="w-full rounded-lg shadow-lg"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src =
                                '/assets/images/placeholder.webp'
                        }}
                    />
                </div>

                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

                    {movie.director && (
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                            Directed by {movie.director}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        {movie.release_date && (
                            <span>
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                        )}
                        {movie.runtime && <span>{movie.runtime} min</span>}
                        {movie.genres?.map((g, index) => (
                            <span
                                key={g.id ?? `${g.name}-${index}`}
                                className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-full px-3 py-1 text-xs"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        {movie.vote_average && (
                            <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-lg">
                                {movie.vote_average.toFixed(1)}
                            </span>
                        )}
                        {movie.vote_count && (
                            <span className="text-gray-600 dark:text-gray-400">
                                {movie.vote_count} reviews
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <FavoritesToggle movie={movie} />
                    </div>

                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                        {movie.overview}
                    </p>

                    {Array.isArray(movie.cast) && movie.cast.length > 0 && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-1">Cast</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {movie.cast.join(', ')}
                            </p>
                        </div>
                    )}

                    {movie.imdb_id && (
                        <div className="mt-6">
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block px-5 py-2 text-sm rounded bg-yellow-500 text-black hover:bg-yellow-600 transition"
                            >
                                View on IMDb
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default MovieDetailsPage
