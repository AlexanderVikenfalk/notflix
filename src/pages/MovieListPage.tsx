import { useFetch } from '../hooks/useFetch'
import { useTitle } from '../hooks/useTitle'
import { Card } from '../components/Card'

import type { MovieSearchResponse } from '@/types/interfaces'

interface MovieListProps {
    title: string
    apiPath: string
}

const MovieListPage = ({ apiPath }: MovieListProps) => {
    const { data } = useFetch<MovieSearchResponse>(apiPath)
    const movies = data?.results ?? []

    useTitle('Popular')

    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                    {movies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MovieListPage
