import { useState, useMemo } from 'react'
import type { MovieSearchResult } from '@/types/interfaces'
import { GENRE_MAP, DEFAULT_FILTERS } from '@/constants/filtering'

export type MovieFilters = typeof DEFAULT_FILTERS

export const useMovieFilters = (movies: MovieSearchResult[]) => {
    const [filters, setFilters] = useState<MovieFilters>(DEFAULT_FILTERS)
    const [appliedFilters, setAppliedFilters] = useState<MovieFilters>(DEFAULT_FILTERS)

    const applyFilters = () => setAppliedFilters(filters)
    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        setAppliedFilters(DEFAULT_FILTERS)
    }

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesGenre =
                appliedFilters.genre.length === 0 ||
                appliedFilters.genre.some((name) =>
                    movie.genre_ids.includes(GENRE_MAP[name])
                )

            const year = Number(movie.release_date?.slice(0, 4)) || null
            const fromYear = appliedFilters.releaseDate.from
                ? Number(appliedFilters.releaseDate.from)
                : null
            const toYear = appliedFilters.releaseDate.to
                ? Number(appliedFilters.releaseDate.to)
                : null

            const matchesReleaseDate = (!fromYear || (year && year >= fromYear)) &&
                (!toYear || (year && year <= toYear))

            const rating = movie.vote_average || 0
            const minRating = appliedFilters.rating.from ? Number(appliedFilters.rating.from) : null
            const maxRating = appliedFilters.rating.to ? Number(appliedFilters.rating.to) : null
            const matchesRating = (!minRating || rating >= minRating) &&
                (!maxRating || rating <= maxRating)

            return matchesGenre && matchesReleaseDate && matchesRating
        })
    }, [movies, appliedFilters])

    const hasActiveFilters = useMemo(() => {
        return Boolean(
            filters.genre.length > 0 ||
            filters.releaseDate.from ||
            filters.releaseDate.to ||
            filters.rating.from ||
            filters.rating.to
        )
    }, [filters])

    return {
        filters,
        setFilters,
        applyFilters,
        resetFilters,
        filteredMovies,
        hasActiveFilters,
    }
}
