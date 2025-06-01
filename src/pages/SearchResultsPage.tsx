import { useSearchParams } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import { MovieCard } from '@/components/'
import type { MovieSearchResponse } from '@/types/interfaces'
import { useEffect, useMemo, useState } from 'react'
import { searchMovies } from '@/services/movieService'
import useApi from '@/hooks/useApi.tsx'
import { SearchFilterPanel } from '@/components/Header/SearchFilterPanel.tsx'
import CircularProgress from '@mui/material/CircularProgress'

const GENRE_MAP: Record<string, number> = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    Thriller: 53,
    War: 10752,
    Western: 37,
}

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams()
    const queryTerm = searchParams.get('q') ?? ''

    const { data, request, loading } = useApi(searchMovies)

    const [filters, setFilters] = useState({
        genre: [] as string[],
        releaseDate: { from: '', to: '' },
        rating: { from: '', to: '' },
    })

    useEffect(() => {
        if (queryTerm) {
            void request(queryTerm)
        }
    }, [queryTerm])

    const movies = (data as MovieSearchResponse)?.results ?? []

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesGenre =
                filters.genre.length === 0 ||
                filters.genre.some((genreName) => {
                    const genreId = GENRE_MAP[genreName]
                    return genreId && movie.genre_ids.includes(genreId)
                })

            const matchesReleaseDate = (() => {
                const movieYear = movie.release_date
                    ? Number(movie.release_date.slice(0, 4))
                    : null
                if (!movieYear)
                    return !filters.releaseDate.from && !filters.releaseDate.to

                const fromYear = filters.releaseDate.from
                    ? Number(filters.releaseDate.from)
                    : null
                const toYear = filters.releaseDate.to
                    ? Number(filters.releaseDate.to)
                    : null

                if (fromYear && movieYear < fromYear) return false
                if (toYear && movieYear > toYear) return false

                return true
            })()

            const matchesRating = (() => {
                const movieRating = movie.vote_average || 0
                const minRating = filters.rating.from
                    ? Number(filters.rating.from)
                    : null
                const maxRating = filters.rating.to
                    ? Number(filters.rating.to)
                    : null

                if (minRating && movieRating < minRating) return false
                if (maxRating && movieRating > maxRating) return false

                return true
            })()

            return matchesGenre && matchesReleaseDate && matchesRating
        })
    }, [movies, filters])

    const hasActiveFilters =
        filters.genre.length > 0 ||
        filters.releaseDate.from ||
        filters.releaseDate.to ||
        filters.rating.from ||
        filters.rating.to

    useTitle(`Search results for "${queryTerm}"`)

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Search Results
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {loading ? (
                            'Searching...'
                        ) : (
                            <>
                                {movies.length > 0 && (
                                    <>
                                        {filteredMovies.length} of{' '}
                                        {movies.length} results for &#34;
                                        {queryTerm}
                                        &#34;{hasActiveFilters && ' (filtered)'}
                                    </>
                                )}
                                {movies.length === 0 &&
                                    !loading &&
                                    `No results found for "${queryTerm}"`}
                            </>
                        )}
                    </p>
                </div>

                {/*Filter Panel*/}
                {movies.length > 0 && (
                    <SearchFilterPanel
                        filters={filters}
                        onChange={setFilters}
                    />
                )}

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <CircularProgress size="3rem" />
                    </div>
                )}

                {!loading && movies.length === 0 && (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No movies found
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search term or check for typos.
                        </p>
                    </div>
                )}

                {!loading &&
                    movies.length > 0 &&
                    filteredMovies.length === 0 &&
                    hasActiveFilters && (
                        <div className="text-center py-12">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No movies match your filters
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Try adjusting your filter criteria to see more
                                results.
                            </p>
                            <button
                                onClick={() =>
                                    setFilters({
                                        genre: [],
                                        releaseDate: { from: '', to: '' },
                                        rating: { from: '', to: '' },
                                    })
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                {!loading && filteredMovies.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default SearchResultsPage
