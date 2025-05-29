import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useTitle } from '../hooks/useTitle'
import { Card } from '../components/Card'
import type { MovieSearchResponse } from '@/types/interfaces'

export const Search = ({ apiPath }: { apiPath: string }) => {
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
                <div className="flex justify-start flex-wrap">
                    {movies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}
