import { useCallback } from 'react'

interface UsePaginationProps {
    page: number
    count: number
    onChange: (page: number) => void
    disabled?: boolean
}

export const usePagination = ({
    page,
    count,
    onChange,
    disabled,
}: UsePaginationProps) => {
    const isFirstPage = page === 1
    const isLastPage = page === count

    const handlePageChange = useCallback(
        (newPage: number) => {
            if (disabled || newPage < 1 || newPage > count) return
            onChange(newPage)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        [disabled, count, onChange]
    )

    return {
        isFirstPage,
        isLastPage,
        handlePageChange,
    }
}
