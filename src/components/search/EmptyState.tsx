import { Button } from '@/components/common/Button'

interface EmptyStateProps {
    onClearFilters: () => void
    filtersApplied: boolean
}

export const EmptyState = ({
    onClearFilters,
    filtersApplied,
}: EmptyStateProps) => (
    <div className="text-center py-12">
        {filtersApplied && (
            <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No movies match your filters
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your filter criteria.
                </p>
            </>
        )}

        {filtersApplied && (
            <Button onClick={onClearFilters} variant="primary">
                Clear all filters
            </Button>
        )}
    </div>
)
