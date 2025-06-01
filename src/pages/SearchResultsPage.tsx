import { useSearchParams } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { MovieCard } from '../components/MovieCard'
import type { MovieSearchResponse } from '@/types/interfaces'
import { useEffect, useMemo } from 'react'
import { searchMovies } from '@/services/movieService'
import useApi from '@/hooks/useApi.tsx'

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams()
    const queryTerm = searchParams.get('q') ?? ''

    const { data, request } = useApi(searchMovies)

    useEffect(() => {
        if (queryTerm) {
            void request(queryTerm)
        }
    }, [queryTerm])

    const movies = (data as MovieSearchResponse)?.results ?? []

    const filteredMovies = useMemo(() => {
        return movies.filter((m) =>
            m.title.toLowerCase().includes(queryTerm.toLowerCase())
        )
    }, [movies, queryTerm])

    useTitle(`Search result for ${queryTerm}`)

    return (
        <main>
            <section className="py-7">
                {filteredMovies.length === 0 && (
                    <p className="text-3xl text-gray-700 dark:text-white">
                        No results found for &#39;{queryTerm}&#39;
                    </p>
                )}
            </section>
            <section className="max-w-7xl mx-auto py-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                    {filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default SearchResultsPage
