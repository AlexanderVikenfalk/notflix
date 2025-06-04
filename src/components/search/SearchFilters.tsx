import { useState } from 'react'
import Chevron from '@/assets/svg/chevron.svg?react'
import { GENRE_NAMES, type GenreName } from '@/constants/filtering.ts'
import { Button } from '@/components/common/Button'

interface Filters {
    genre: GenreName[]
    releaseDate: { from: string; to: string }
    rating: { from: string; to: string }
}

interface SearchFilterPanelProps {
    filters: Filters
    onChange: (filters: Filters) => void
    onApply: () => void
}

export const SearchFilters = ({
    filters,
    onChange,
    onApply,
}: SearchFilterPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleGenreToggle = (genre: GenreName) => {
        const newGenres = filters.genre.includes(genre)
            ? filters.genre.filter((g) => g !== genre)
            : [...filters.genre, genre]
        onChange({ ...filters, genre: newGenres })
    }

    const handleRemoveGenre = (genre: string) => {
        onChange({
            ...filters,
            genre: filters.genre.filter((g) => g !== genre),
        })
    }

    const handleReleaseDateChange = (field: 'from' | 'to', value: string) => {
        onChange({
            ...filters,
            releaseDate: { ...filters.releaseDate, [field]: value },
        })
    }

    const handleRatingChange = (field: 'from' | 'to', value: string) => {
        onChange({
            ...filters,
            rating: { ...filters.rating, [field]: value },
        })
    }

    const clearAllFilters = () => {
        onChange({
            genre: [],
            releaseDate: { from: '', to: '' },
            rating: { from: '', to: '' },
        })
    }

    const hasActiveFilters =
        filters.genre.length > 0 ||
        filters.releaseDate.from ||
        filters.releaseDate.to ||
        filters.rating.from ||
        filters.rating.to

    const isInvalidYearRange =
        !!filters.releaseDate.from &&
        !!filters.releaseDate.to &&
        parseInt(filters.releaseDate.to) < parseInt(filters.releaseDate.from)

    const isInvalidRatingRange =
        !!filters.rating.from &&
        !!filters.rating.to &&
        parseFloat(filters.rating.to) < parseFloat(filters.rating.from)

    return (
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h2 className="sr-only">Movie filtering</h2>
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        Filters
                    </h3>
                    {hasActiveFilters && (
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            {filters.genre.length +
                                (filters.releaseDate.from ||
                                filters.releaseDate.to
                                    ? 1
                                    : 0) +
                                (filters.rating.from || filters.rating.to
                                    ? 1
                                    : 0)}{' '}
                            active
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearAllFilters()
                            }}
                            variant="ghost"
                            className="text-sm"
                        >
                            Clear all
                        </Button>
                    )}
                    {isExpanded ? (
                        <Chevron className="w-5 h-5 text-gray-500 rotate-90" />
                    ) : (
                        <Chevron className="w-5 h-5 text-gray-500 rotate-270" />
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <label
                            htmlFor="genre-select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                        >
                            Genre
                        </label>

                        {filters.genre.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {filters.genre.map((genre) => (
                                    <span
                                        key={genre}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                    >
                                        {genre}
                                        <Button
                                            onClick={() =>
                                                handleRemoveGenre(genre)
                                            }
                                            aria-label={`Remove genre ${genre}`}
                                            title={`Remove genre ${genre}`}
                                            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-5 h-5 p-0 text-sm font-bold flex items-center justify-center leading-none"
                                            variant="ghost"
                                        >
                                            ×
                                        </Button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <select
                            className="w-full max-w-xs p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="genre-select"
                            aria-label="Add Genre Filter"
                            value=""
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleGenreToggle(
                                        e.target.value as GenreName
                                    )
                                    e.target.value = ''
                                }
                            }}
                        >
                            <option value="">Add genre...</option>
                            {GENRE_NAMES.filter(
                                (genre: GenreName) =>
                                    !filters.genre.includes(genre)
                            ).map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <label
                            htmlFor="release-date"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                        >
                            Release Date
                        </label>
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    aria-label="From year filter"
                                    id="release-date"
                                    placeholder="From year"
                                    min="1900"
                                    max="2030"
                                    value={filters.releaseDate.from}
                                    onChange={(e) =>
                                        handleReleaseDateChange(
                                            'from',
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                                to
                            </span>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    aria-label="To year filter"
                                    placeholder="To year"
                                    min="1900"
                                    max="2030"
                                    value={filters.releaseDate.to}
                                    onChange={(e) =>
                                        handleReleaseDateChange(
                                            'to',
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                        >
                            Rating (IMDB)
                        </label>
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="Min rating"
                                    aria-label="Min rating filter"
                                    id="rating"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={filters.rating.from}
                                    onChange={(e) =>
                                        handleRatingChange(
                                            'from',
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                                to
                            </span>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="Max rating"
                                    aria-label="Max rating filter"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={filters.rating.to}
                                    onChange={(e) =>
                                        handleRatingChange('to', e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex justify-end">
                        <Button
                            variant="primary"
                            disabled={
                                isInvalidYearRange || isInvalidRatingRange
                            }
                            onClick={onApply}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
