import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

interface SearchContextType {
    query: string
    setQuery: (value: string) => void
    rawSetQuery: (value: string) => void
    page: number
    setPage: (value: number) => void
    debouncedQuery: string
    resetToFirstPage: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('q') || ''
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 400)
        return () => clearTimeout(handler)
    }, [query])

    const pageParam = parseInt(searchParams.get('page') || '1', 10)
    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

    const setPage = (value: number) => {
        const safeValue = Math.max(1, value)
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', safeValue.toString())
            return newParams
        })
    }

    const resetToFirstPage = () => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', '1')
            return newParams
        })
    }

    const setQuery = (value: string) => {
        if (value.trim()) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('q', value)
                return newParams
            })
        } else {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.delete('q')
                return newParams
            })
        }
    }

    const rawSetQuery = (value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (value.trim()) {
                newParams.set('q', value)
            } else {
                newParams.delete('q')
            }
            return newParams
        })
    }

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                rawSetQuery,
                page,
                setPage,
                debouncedQuery,
                resetToFirstPage,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}
