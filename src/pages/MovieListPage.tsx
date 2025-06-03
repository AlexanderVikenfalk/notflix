import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import { getMovies } from '@/services/movieService'
import { useTitle } from '@/hooks/useTitle'
import type { MovieSearchResponse } from '@/types/api/movie'
import { MovieGrid } from '@/components/MovieGrid'

const MovieListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, request, loading } = useApi<MovieSearchResponse, [number]>(
        getMovies
    )

    useTitle('Home')

    useEffect(() => {
        request(currentPage)
    }, [currentPage])

    const movies = data?.results ?? []
    const totalPages = data?.total_pages ?? 1

    return (
        <main className="min-h-screen">
            <MovieGrid
                movies={movies}
                loading={loading}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </main>
    )
}

export default MovieListPage
