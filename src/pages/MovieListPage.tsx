import { useEffect } from 'react'
import useApi from '@/hooks/useApi'
import { getMovies } from '@/services/movieService'
import { useTitle } from '@/hooks/useTitle'
import type { MovieSearchResponse } from '@/types/api/movie'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { useSearch } from '@/contexts/SearchContext.tsx'

const MovieListPage = () => {
    const { page, setPage } = useSearch()

    const { data, request, loading } = useApi<
        MovieSearchResponse | undefined,
        [number]
    >(getMovies)

    useTitle('Home')

    useEffect(() => {
        request(page)
    }, [page])

    const movies = data?.results ?? undefined
    const totalPages = data?.total_pages ?? 1

    return (
        <main className="min-h-screen">
            <MovieGrid
                movies={movies}
                loading={loading}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        </main>
    )
}

export default MovieListPage
