import { useState, useMemo } from 'react'
import type { MovieSearchResult } from '@/types/interfaces'
import { GENRE_MAP, DEFAULT_FILTERS } from '@/constants/filtering'

export type MovieFilters = typeof DEFAULT_FILTERS

const matchesGenre = (
    movie: MovieSearchResult,
    genreFilter: string[]
): boolean => {
    if (genreFilter.length === 0) return true

    return genreFilter.some((genreName) => {
        const genreId = GENRE_MAP[genreName]
        return genreId && movie.genre_ids.includes(genreId)
    })
}

const matchesReleaseDate = (
    movie: MovieSearchResult,
    dateFilter: { from: string; to: string }
): boolean => {
    const year = Number(movie.release_date?.slice(0, 4)) || null
    const from = dateFilter.from ? Number(dateFilter.from) : null
    const to = dateFilter.to ? Number(dateFilter.to) : null

    if (!year) return !from && !to
    if (from && year < from) return false
    if (to && year > to) return false
    return true
}

const matchesRating = (
    movie: MovieSearchResult,
    ratingFilter: { from: string; to: string }
): boolean => {
    const rating = movie.vote_average || 0
    const min = ratingFilter.from ? Number(ratingFilter.from) : null
    const max = ratingFilter.to ? Number(ratingFilter.to) : null

    if (min && rating < min) return false
    if (max && rating > max) return false
    return true
}

export const useMovieFilters = (movies: MovieSearchResult[]) => {
    const [filters, setFilters] = useState<MovieFilters>(DEFAULT_FILTERS)

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            return (
                matchesGenre(movie, filters.genre) &&
                matchesReleaseDate(movie, filters.releaseDate) &&
                matchesRating(movie, filters.rating)
            )
        })
    }, [movies, filters])

    const hasActiveFilters = useMemo(() => {
        return (
            filters.genre.length > 0 ||
            !!filters.releaseDate.from ||
            !!filters.releaseDate.to ||
            !!filters.rating.from ||
            !!filters.rating.to
        )
    }, [filters])

    const resetFilters = () => setFilters(DEFAULT_FILTERS)

    return {
        filters,
        setFilters,
        filteredMovies,
        hasActiveFilters,
        resetFilters,
    }
}
