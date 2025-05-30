import { useState, useEffect } from 'react'
import { movieSearchResponse, movieDetails } from '@/mocks/dummyData'
import type { MovieSearchResponse  } from '@/types/interfaces'

export const useFetch = <T = unknown,>(apiPath: string, queryTerm = '') => {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (apiPath === 'search/movie') {
                const filtered = movieSearchResponse.results.filter((movie) =>
                    movie.title
                        .toLowerCase()
                        .includes(queryTerm.trim().toLowerCase())
                )

                const result: MovieSearchResponse = {
                    ...movieSearchResponse,
                    results: filtered,
                }

                setData(result as T)
            }
            else if (apiPath === 'movie/popular') {
                const result: MovieSearchResponse = {
                    ...movieSearchResponse,
                    results: movieSearchResponse.results.slice(0, 10),
                }

                setData(result as T)
            }
            else if (apiPath.startsWith('movie/')) {
                setData(movieDetails as T)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [apiPath, queryTerm])

    return { data }
}
