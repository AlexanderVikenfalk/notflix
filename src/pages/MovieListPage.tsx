import { useFetch } from '../hooks/useFetch'
import { useTitle } from '../hooks/useTitle'
import { Card } from '../components/Card'

import type { MovieSearchResult } from '@/types/interfaces'

interface MovieListProps {
    title: string
    apiPath: string
}

export const MovieListPage = ({ apiPath, title }: MovieListProps) => {
    const { data } = useFetch<MovieSearchResult[]>(apiPath)
    const movies = data ?? []

    useTitle(title)

    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                <div className="flex justify-start flex-wrap other:justify-evenly">
                    {movies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    )
}
