import { useEffect } from 'react'
import useApi from '@/hooks/useApi'
import { useTitle } from '@/hooks/useTitle'
import { MovieCard } from '@/components/MovieCard.tsx'
import { getMovies } from '@/services/movieService'
import type { MovieSearchResult } from '@/types/interfaces'

const MovieListPage = () => {
    const { data, request } = useApi(getMovies)

    useEffect(() => {
        ;(async () => {
            await request()
        })()
    }, [])

    useTitle('Popular Movies')

    const movies = (data as MovieSearchResult[]) || []

    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                    {movies.map((movie: MovieSearchResult) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MovieListPage
