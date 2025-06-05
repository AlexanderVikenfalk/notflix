import { PaginationButton } from '@/components/pagination/PaginationButton'

interface PaginationNumbersProps {
    visiblePages: (number | 'ellipsis')[]
    currentPage: number
    onPageChange: (page: number) => void
    disabled: boolean
}

export const PaginationNumbers = ({
    visiblePages,
    currentPage,
    onPageChange,
    disabled,
}: PaginationNumbersProps) => (
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
                <PaginationButton
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    disabled={disabled}
                    isActive={pageNum === currentPage}
                    title={`Go to page ${pageNum}`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === currentPage ? 'page' : undefined}
                >
                    {pageNum}
                </PaginationButton>
            )
        )}
    </div>
)
