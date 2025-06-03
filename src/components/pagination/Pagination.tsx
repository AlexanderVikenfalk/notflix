import Chevron from '@/assets/svg/chevron.svg?react'
import ChevronDouble from '@/assets/svg/chevron-double.svg?react'
import { getVisiblePages } from '@/utils/paginationUtils'
import { usePagination } from '@/hooks/usePagination'
import { PaginationButton } from './PaginationButton'
import { PaginationNumbers } from './PaginationNumbers'
import { PaginationInfo } from './PaginationInfo'

interface PaginationProps {
    page: number
    count: number
    onChange: (page: number) => void
    disabled?: boolean
}

export const Pagination = ({
    page,
    count,
    onChange,
    disabled = false,
}: PaginationProps) => {
    if (count <= 1) return null

    const { isFirstPage, isLastPage, handlePageChange } = usePagination({
        page,
        count,
        onChange,
        disabled,
    })

    const visiblePages = getVisiblePages(page, count)

    return (
        <nav
            className="flex items-center justify-center gap-2 py-8 px-4"
            role="navigation"
            aria-label="Pagination"
        >
            <h2 className="sr-only">Pagination navigation</h2>
            <PaginationButton
                onClick={() => handlePageChange(1)}
                disabled={disabled || isFirstPage}
                aria-label="Go to first page"
                title="First page"
            >
                <ChevronDouble className="w-4 h-4" />
            </PaginationButton>

            <PaginationButton
                onClick={() => handlePageChange(page - 1)}
                disabled={disabled || isFirstPage}
                aria-label="Go to previous page"
                title="Previous page"
            >
                <Chevron className="w-4 h-4" />
            </PaginationButton>

            <PaginationNumbers
                visiblePages={visiblePages}
                currentPage={page}
                onPageChange={handlePageChange}
                disabled={disabled}
            />

            <PaginationInfo currentPage={page} totalPages={count} />

            <PaginationButton
                onClick={() => handlePageChange(page + 1)}
                disabled={disabled || isLastPage}
                aria-label="Go to next page"
                title="Next page"
            >
                <Chevron className="w-4 h-4 rotate-180" />
            </PaginationButton>

            <PaginationButton
                onClick={() => handlePageChange(count)}
                disabled={disabled || isLastPage}
                aria-label="Go to last page"
                title="Last page"
            >
                <ChevronDouble className="w-4 h-4 rotate-180" />
            </PaginationButton>
        </nav>
    )
}
