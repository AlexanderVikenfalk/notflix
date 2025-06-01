import { useState } from 'react'
import Chevron from '@/assets/svg/chevron.svg?react'

interface Filters {
    genre: string[]
    releaseDate: { from: string; to: string }
    rating: { from: string; to: string }
}

interface SearchFilterPanelProps {
    filters: Filters
    onChange: (filters: Filters) => void
}

const GENRES = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'War',
    'Western',
]

export const SearchFilterPanel = ({
    filters,
    onChange,
}: SearchFilterPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleGenreToggle = (genre: string) => {
        const newGenres = filters.genre.includes(genre)
            ? filters.genre.filter((g) => g !== genre)
            : [...filters.genre, genre]

        onChange({
            ...filters,
            genre: newGenres,
        })
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
            releaseDate: {
                ...filters.releaseDate,
                [field]: value,
            },
        })
    }

    const handleRatingChange = (field: 'from' | 'to', value: string) => {
        onChange({
            ...filters,
            rating: {
                ...filters.rating,
                [field]: value,
            },
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

    return (
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            {/* Header */}
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearAllFilters()
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                    {isExpanded ? (
                        <Chevron className="w-5 h-5 text-gray-500 rotate-90" />
                    ) : (
                        <Chevron className="w-5 h-5 text-gray-500 rotate-270" />
                    )}
                </div>
            </div>

            {/* Filter Content */}
            {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* Genre Filter */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Genre
                        </label>

                        {/* Selected genres as pills */}
                        {filters.genre.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {filters.genre.map((genre) => (
                                    <span
                                        key={genre}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                    >
                                        {genre}
                                        <button
                                            onClick={() =>
                                                handleRemoveGenre(genre)
                                            }
                                            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                                        >
                                            <span className="w-3 h-3">X</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Genre dropdown */}
                        <select
                            className="w-full max-w-xs p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value=""
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleGenreToggle(e.target.value)
                                    e.target.value = ''
                                }
                            }}
                        >
                            <option value="">Add genre...</option>
                            {GENRES.filter(
                                (genre) => !filters.genre.includes(genre)
                            ).map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Release Date Filter */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Release Date
                        </label>
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1">
                                <input
                                    type="number"
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

                    {/* Rating Filter */}
                    <div className="p-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Rating (IMDB)
                        </label>
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="Min rating"
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
                </div>
            )}
        </div>
    )
}
