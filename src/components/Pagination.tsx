import Chevron from '@/assets/svg/chevron.svg?react'
import ChevronDouble from '@/assets/svg/chevron-double.svg?react'

interface PaginationProps {
    page: number
    count: number
    onChange: (page: number) => void
    disabled?: boolean
}

const getVisiblePages = (
    current: number,
    total: number
): (number | 'ellipsis')[] => {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = []

    pages.push(1)

    if (current <= 3) {
        pages.push(2, 3)
        if (total > 4) pages.push('ellipsis')
        pages.push(total)
    } else if (current >= total - 2) {
        if (total > 4) pages.push('ellipsis')
        pages.push(total - 2, total - 1, total)
    } else {
        pages.push('ellipsis')
        pages.push(current)
        pages.push('ellipsis')
        pages.push(total)
    }

    return pages
}

export const Pagination = ({
    page,
    count,
    onChange,
    disabled = false,
}: PaginationProps) => {
    if (count <= 1) return null

    const isFirstPage = page === 1
    const isLastPage = page === count

    const handlePageChange = (newPage: number) => {
        if (disabled || newPage < 1 || newPage > count) return
        onChange(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const visiblePages = getVisiblePages(page, count)

    const buttonBaseClass =
        'min-w-[44px] h-11 flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
    const buttonEnabledClass =
        'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
    const buttonDisabledClass =
        'text-gray-400 dark:text-gray-600 cursor-not-allowed'
    const buttonActiveClass =
        'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold underline hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer px-2'

    return (
        <nav
            className="flex items-center justify-center gap-2 py-8 px-4"
            role="navigation"
            aria-label="Pagination"
        >
            <button
                onClick={() => handlePageChange(1)}
                disabled={disabled || isFirstPage}
                className={`${buttonBaseClass} ${
                    disabled || isFirstPage
                        ? buttonDisabledClass
                        : buttonEnabledClass
                }`}
                aria-label="Go to first page"
                title="First page"
            >
                <ChevronDouble className="w-4 h-4" />
            </button>

            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={disabled || isFirstPage}
                className={`${buttonBaseClass} ${
                    disabled || isFirstPage
                        ? buttonDisabledClass
                        : buttonEnabledClass
                }`}
                aria-label="Go to previous page"
                title="Previous page"
            >
                <Chevron className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-2 mx-2">
                {visiblePages.map((pageNum, index) =>
                    pageNum === 'ellipsis' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-gray-500 dark:text-gray-400 select-none"
                            aria-hidden="true"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={disabled}
                            className={`${buttonBaseClass} ${
                                pageNum === page
                                    ? buttonActiveClass
                                    : disabled
                                      ? buttonDisabledClass
                                      : buttonEnabledClass
                            }`}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={pageNum === page ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    )
                )}
            </div>

            <div className="flex sm:hidden items-center mx-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {page} of {count}
                </span>
            </div>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={disabled || isLastPage}
                className={`${buttonBaseClass} ${
                    disabled || isLastPage
                        ? buttonDisabledClass
                        : buttonEnabledClass
                }`}
                aria-label="Go to next page"
                title="Next page"
            >
                <Chevron className="w-4 h-4 rotate-180" />
            </button>

            <button
                onClick={() => handlePageChange(count)}
                disabled={disabled || isLastPage}
                className={`${buttonBaseClass} ${
                    disabled || isLastPage
                        ? buttonDisabledClass
                        : buttonEnabledClass
                }`}
                aria-label="Go to last page"
                title="Last page"
            >
                <ChevronDouble className="w-4 h-4 rotate-180" />
            </button>
        </nav>
    )
}
