import type { ReactNode } from 'react'

interface SearchHeaderProps {
    queryTerm: string
    loading: boolean
    resultsCount: number
    hasActiveFilters: boolean
}

export function SearchHeader({
    queryTerm,
    loading,
    resultsCount,
    hasActiveFilters,
}: SearchHeaderProps) {
    const getResultsText = (): ReactNode => {
        if (loading) return 'Searching...'

        if (resultsCount > 0) {
            return (
                <>
                    {resultsCount} results for &quot;{queryTerm}&quot;
                    {hasActiveFilters && ' (filtered)'}
                </>
            )
        }

        return `No results found for "${queryTerm}"`
    }

    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Search Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
                {getResultsText()}
            </p>
        </div>
    )
}
