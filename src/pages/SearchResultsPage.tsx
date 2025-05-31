import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useTitle } from '../hooks/useTitle'
import { MovieCard } from '../components/MovieCard.tsx'
import type { MovieSearchResponse } from '@/types/interfaces'

const SearchResultsPage = ({ apiPath }: { apiPath: string }) => {
    const [searchParams] = useSearchParams()
    const queryTerm = searchParams.get('q') ?? ''

    const { data } = useFetch<MovieSearchResponse>(apiPath, queryTerm)
    const movies = data?.results ?? []

    useTitle(`Search result for ${queryTerm}`)

    return (
        <main>
            <section className="py-7">
                <p className="text-3xl text-gray-700 dark:text-white">
                    {movies.length === 0
                        ? `No result found for '${queryTerm}'`
                        : `Result for '${queryTerm}'`}
                </p>
            </section>
            <section className="max-w-7xl mx-auto py-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default SearchResultsPage
