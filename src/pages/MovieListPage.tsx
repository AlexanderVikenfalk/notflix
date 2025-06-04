import { useEffect } from 'react'
import useApi from '@/hooks/useApi'
import { getMovies } from '@/services/movieService'
import { useTitle } from '@/hooks/useTitle'
import type { MovieSearchResponse } from '@/types/api/movie'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { useSearch } from '@/contexts/SearchContext'
import { ErrorMessage } from '@/components/common/ErrorMessage'

const MovieListPage = () => {
    const { page, setPage } = useSearch()

    const { data, request, loading, error } = useApi<
        MovieSearchResponse | undefined,
        [number]
    >(getMovies)

    useTitle('Home')

    useEffect(() => {
        void request(page)
    }, [page])

    if (error) {
        return (
            <ErrorMessage
                title="Failed to load movies"
                message={error}
                action={{
                    label: 'Try again',
                    onClick: () => void request(page),
                }}
            />
        )
    }

    const movies = data?.results ?? undefined
    const totalPages = data?.total_pages ?? 1

    return (
        <main>
            <div>
                <MovieGrid
                    movies={movies}
                    loading={loading}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
            </div>
        </main>
    )
}

export default MovieListPage
