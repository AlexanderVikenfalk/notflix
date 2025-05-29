import { useState, useEffect } from 'react'
import { dummyData } from '@/mocks/dummyData'

export const useFetch = <T = unknown,>(apiPath: string, queryTerm = '') => {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(dummyData.results as T)
        }, 300)

        return () => clearTimeout(timer)
    }, [apiPath, queryTerm])

    return { data }
}
