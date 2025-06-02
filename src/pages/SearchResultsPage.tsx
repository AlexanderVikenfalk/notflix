import { useSearchParams } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import { MovieCard, Pagination } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { searchMovies } from '@/services/movieService'
import useApi from '@/hooks/useApi.tsx'
import { SearchFilterPanel } from '@/components/header/SearchFilterPanel.tsx'
import CircularProgress from '@mui/material/CircularProgress'
import type { MovieSearchResponse } from '@/types/interfaces'

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

const DEFAULT_FILTERS = {
    genre: [] as string[],
    releaseDate: { from: '', to: '' },
    rating: { from: '', to: '' },
}

const SearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryTerm = searchParams.get('q') ?? ''
    const page = parseInt(searchParams.get('page') ?? '1', 10)

    const { data, request, loading } = useApi<
        MovieSearchResponse,
        [string, number]
    >(searchMovies)
    const [filters, setFilters] = useState(DEFAULT_FILTERS)

    useEffect(() => {
        setFilters(DEFAULT_FILTERS)
        if (queryTerm) {
            void request(queryTerm, page)
        }
    }, [queryTerm, page])

    useEffect(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', '1')
            return newParams
        })
    }, [filters])

    const movies = data?.results ?? []
    const totalPages = data?.total_pages ?? 1

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesGenre =
                filters.genre.length === 0 ||
                filters.genre.some((genreName) => {
                    const genreId = GENRE_MAP[genreName]
                    return genreId && movie.genre_ids.includes(genreId)
                })

            const matchesReleaseDate = (() => {
                const year = Number(movie.release_date?.slice(0, 4)) || null
                const from = filters.releaseDate.from
                    ? Number(filters.releaseDate.from)
                    : null
                const to = filters.releaseDate.to
                    ? Number(filters.releaseDate.to)
                    : null
                if (!year) return !from && !to
                if (from && year < from) return false
                if (to && year > to) return false
                return true
            })()

            const matchesRating = (() => {
                const rating = movie.vote_average || 0
                const min = filters.rating.from
                    ? Number(filters.rating.from)
                    : null
                const max = filters.rating.to ? Number(filters.rating.to) : null
                if (min && rating < min) return false
                if (max && rating > max) return false
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

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', String(newPage))
            return newParams
        })
    }

    useTitle(`Search results for "${queryTerm}"`)

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Search Results
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {loading ? (
                            'Searching...'
                        ) : filteredMovies.length > 0 ? (
                            <>
                                {filteredMovies.length} results for &#34;
                                {queryTerm}&#34;
                                {hasActiveFilters && ' (filtered)'}
                            </>
                        ) : (
                            `No results found for "${queryTerm}"`
                        )}
                    </p>
                </div>

                {/* Filters */}
                {movies.length > 0 && (
                    <SearchFilterPanel
                        filters={filters}
                        onChange={setFilters}
                    />
                )}

                {/* Loader */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <CircularProgress size="3rem" />
                    </div>
                )}

                {/* No results or filtered out */}
                {!loading && filteredMovies.length === 0 && (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No movies match your filters
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Try adjusting your filter criteria.
                        </p>
                        <button
                            onClick={() => setFilters(DEFAULT_FILTERS)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Movie Grid */}
                {!loading && filteredMovies.length > 0 && (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filteredMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                page={page}
                                count={totalPages}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}

export default SearchResultsPage
