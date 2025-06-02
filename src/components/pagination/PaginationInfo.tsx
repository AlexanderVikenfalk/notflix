interface PaginationInfoProps {
    currentPage: number
    totalPages: number
}

export const PaginationInfo = ({
    currentPage,
    totalPages,
}: PaginationInfoProps) => (
    <div className="flex sm:hidden items-center mx-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
        </span>
    </div>
)
