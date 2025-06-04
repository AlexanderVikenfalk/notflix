import { useEffect } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { searchMovies } from '@/services/movieService'
import useApi from '@/hooks/useApi'
import { SearchFilters } from '@/components/search/SearchFilters'
import { useMovieFilters } from '@/hooks/useMovieFilters'
import { useSearch } from '@/contexts/SearchContext'
import { SearchHeader } from '@/components/search/SearchHeader'
import { EmptyState } from '@/components/search/EmptyState'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import type { MovieSearchResponse } from '@/types/api/movie'

const SearchResultsPage = () => {
    const { debouncedQuery, page, setPage, resetToFirstPage } = useSearch()

    const { data, request, loading, error } = useApi<
        MovieSearchResponse,
        [string, number]
    >(searchMovies)

    const movies = data?.results ?? []
    const totalPages = data?.total_pages ?? 1

    const {
        filters,
        setFilters,
        filteredMovies,
        hasActiveFilters,
        resetFilters,
        applyFilters,
    } = useMovieFilters(movies)

    useTitle(`Search results for "${debouncedQuery}"`)

    useEffect(() => {
        resetFilters()
        resetToFirstPage()
    }, [debouncedQuery])

    useEffect(() => {
        if (debouncedQuery) {
            void request(debouncedQuery, page)
        }
    }, [debouncedQuery, page])

    if (error) {
        return (
            <ErrorMessage
                title="Failed to load search results"
                message={error}
                action={{
                    label: 'Try again',
                    onClick: () => void request(debouncedQuery, page),
                }}
            />
        )
    }

    const shouldShowFilters = movies.length > 0
    const shouldShowEmptyState =
        !loading &&
        filteredMovies.length === 0 &&
        (hasActiveFilters || debouncedQuery.length > 0)
    const shouldShowMovieGrid = !loading && filteredMovies.length > 0

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <SearchHeader
                    queryTerm={debouncedQuery}
                    loading={loading}
                    resultsCount={filteredMovies.length}
                    hasActiveFilters={hasActiveFilters}
                />

                {shouldShowFilters && (
                    <SearchFilters
                        filters={filters}
                        onChange={setFilters}
                        onApply={applyFilters}
                    />
                )}

                {shouldShowEmptyState && (
                    <EmptyState
                        onClearFilters={resetFilters}
                        filtersApplied={hasActiveFilters}
                    />
                )}

                {shouldShowMovieGrid && (
                    <MovieGrid
                        movies={filteredMovies}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        loading={loading}
                    />
                )}
            </div>
        </main>
    )
}

export default SearchResultsPage
