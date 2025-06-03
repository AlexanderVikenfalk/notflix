import { useSearchParams as useRouterSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

const FILTER_PARAMS = ['genres', 'yearFrom', 'yearTo', 'ratingFrom', 'ratingTo'] as const

export const useSearchParamsManager = () => {
    const [searchParams, setSearchParams] = useRouterSearchParams()

    const queryTerm = searchParams.get('q') ?? ''
    const page = parseInt(searchParams.get('page') ?? '1', 10)

    const [debouncedQuery, setDebouncedQuery] = useState(queryTerm)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(queryTerm), 400)
        return () => clearTimeout(handler)
    }, [queryTerm])

    const preserveFilterParams = useCallback((newParams: URLSearchParams) => {
        // Preserve existing filter parameters
        FILTER_PARAMS.forEach(param => {
            const value = searchParams.get(param)
            if (value) {
                newParams.set(param, value)
            }
        })
        return newParams
    }, [searchParams])

    const updatePage = useCallback(
        (newPage: number) => {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', String(newPage))
                return preserveFilterParams(newParams)
            })
        },
        [setSearchParams, preserveFilterParams]
    )

    const resetToFirstPage = useCallback(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', '1')
            return preserveFilterParams(newParams)
        })
    }, [setSearchParams, preserveFilterParams])

    return {
        queryTerm,
        debouncedQuery,
        page,
        updatePage,
        resetToFirstPage,
    }
}
