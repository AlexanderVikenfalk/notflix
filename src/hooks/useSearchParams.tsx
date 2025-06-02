import { useSearchParams as useRouterSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export const useSearchParamsManager = () => {
    const [searchParams, setSearchParams] = useRouterSearchParams()

    const queryTerm = searchParams.get('q') ?? ''
    const page = parseInt(searchParams.get('page') ?? '1', 10)

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
        page,
        updatePage,
        resetToFirstPage,
    }
}
