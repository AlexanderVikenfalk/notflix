interface EmptyStateProps {
    onClearFilters: () => void
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => (
    <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No movies match your filters
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filter criteria.
        </p>
        <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
            Clear all filters
        </button>
    </div>
)
