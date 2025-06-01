import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import { MovieCard } from '@/components/'
import { getMovies } from '@/services/movieService'
import type { MovieSearchResponse, MovieSearchResult } from '@/types/interfaces'
import { Pagination } from '@/components/Pagination/Pagination'
import { useTitle } from '@/hooks/useTitle.tsx'

const MovieListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, request, loading } = useApi(getMovies)

    useTitle('Home')

    useEffect(() => {
        request(currentPage)
    }, [currentPage])

    const movies = (data as MovieSearchResponse)?.results ?? []
    const totalPages = (data as MovieSearchResponse)?.total_pages ?? 1

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                {!loading && movies.length === 0 && (
                    <p className="text-3xl text-gray-700 dark:text-white">
                        No movies to display
                    </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 px-8">
                    {movies.map((movie: MovieSearchResult) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
            <Pagination
                page={currentPage}
                count={totalPages}
                onChange={handlePageChange}
            />
        </main>
    )
}

export default MovieListPage
