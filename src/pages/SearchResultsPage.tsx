import { useEffect } from 'react'
import { useTitle } from '@/hooks/useTitle'
import { searchMovies } from '@/services/movieService'
import useApi from '@/hooks/useApi'
import { SearchFilterPanel } from '@/components/header/SearchFilterPanel'
import { useMovieFilters } from '@/hooks/useMovieFilters'
import { useSearchParamsManager } from '@/hooks/useSearchParams'
import {
    SearchHeader,
    LoadingSpinner,
    EmptyState,
    MovieGrid,
} from '@/components/'
import type { MovieSearchResponse } from '@/types/interfaces'

const SearchResultsPage = () => {
    const { queryTerm, page, updatePage, resetToFirstPage } =
        useSearchParamsManager()

    const { data, request, loading } = useApi<
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
        applyFilters
    } = useMovieFilters(movies)

    useTitle(`Search results for "${queryTerm}"`)

    useEffect(() => {
        resetFilters()
        resetToFirstPage()
    }, [queryTerm])

    useEffect(() => {
        if (queryTerm) {
            void request(queryTerm, page)
        }
    }, [queryTerm, page])

    const shouldShowFilters = movies.length > 0
    const shouldShowLoader = loading
    const shouldShowEmptyState =
        !loading &&
        filteredMovies.length === 0 &&
        hasActiveFilters
    const shouldShowMovieGrid = !loading && filteredMovies.length > 0

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <SearchHeader
                    queryTerm={queryTerm}
                    loading={loading}
                    resultsCount={filteredMovies.length}
                    hasActiveFilters={hasActiveFilters}
                />

                {shouldShowFilters && (

                            <SearchFilterPanel
                                filters={filters}
                                onChange={setFilters}
                                onApply={applyFilters}
                            />

                )}

                {shouldShowLoader && <LoadingSpinner />}

                {shouldShowEmptyState && (
                    <EmptyState onClearFilters={resetFilters} />
                )}

                {shouldShowMovieGrid && (
                    <MovieGrid
                        movies={filteredMovies}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={updatePage}
                        loading={loading}
                    />
                )}
            </div>
        </main>
    )
}

export default SearchResultsPage
