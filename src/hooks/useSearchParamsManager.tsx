import { useSearchParams as useRouterSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

export const useSearchParamsManager = () => {
    const [searchParams, setSearchParams] = useRouterSearchParams()

    const queryTerm = searchParams.get('q') ?? ''
    const page = parseInt(searchParams.get('page') ?? '1', 10)

    const [debouncedQuery, setDebouncedQuery] = useState(queryTerm)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(queryTerm), 400)
        return () => clearTimeout(handler)
    }, [queryTerm])

    const updatePage = useCallback(
        (newPage: number) => {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', String(newPage))
                return newParams
            })
        },
        [setSearchParams]
    )

    const resetToFirstPage = useCallback(() => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', '1')
            return newParams
        })
    }, [setSearchParams])

    return {
        queryTerm,
        debouncedQuery,
        page,
        updatePage,
        resetToFirstPage,
    }
}
