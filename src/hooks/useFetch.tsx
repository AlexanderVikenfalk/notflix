import { useState, useEffect } from 'react'
import { dummyData } from '@/mocks/dummyData'

export const useFetch = <T = unknown,>(apiPath: string, queryTerm = '') => {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            const filtered = dummyData.results.filter((movie) =>
                movie.title.toLowerCase().includes(queryTerm.toLowerCase())
            )

            setData({ ...dummyData, results: filtered } as T)
        }, 300)

        return () => clearTimeout(timer)
    }, [apiPath, queryTerm])

    return { data }
}
