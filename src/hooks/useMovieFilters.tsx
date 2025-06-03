import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MovieSearchResult } from '@/types/api/movie'
import { GENRE_MAP, DEFAULT_FILTERS } from '@/constants/filtering'
import type { GenreName } from '@/constants/filtering'

export type MovieFilters = typeof DEFAULT_FILTERS

const FILTER_PARAMS = ['genres', 'yearFrom', 'yearTo', 'ratingFrom', 'ratingTo'] as const
type FilterParam = typeof FILTER_PARAMS[number]

const serializeFilters = (filters: MovieFilters) => {
    const params: Record<FilterParam, string> = {} as Record<FilterParam, string>
    
    if (filters.genre.length > 0) {
        params.genres = filters.genre.join(',')
    }
    if (filters.releaseDate.from) {
        params.yearFrom = filters.releaseDate.from
    }
    if (filters.releaseDate.to) {
        params.yearTo = filters.releaseDate.to
    }
    if (filters.rating.from) {
        params.ratingFrom = filters.rating.from
    }
    if (filters.rating.to) {
        params.ratingTo = filters.rating.to
    }
    
    return params
}

const deserializeFilters = (searchParams: URLSearchParams): MovieFilters => {
    const genres = searchParams.get('genres')
    return {
        genre: genres ? (genres.split(',').filter(Boolean) as GenreName[]) : [],
        releaseDate: {
            from: searchParams.get('yearFrom') || '',
            to: searchParams.get('yearTo') || '',
        },
        rating: {
            from: searchParams.get('ratingFrom') || '',
            to: searchParams.get('ratingTo') || '',
        },
    }
}

export const useMovieFilters = (movies: MovieSearchResult[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialFilters = useMemo(() => deserializeFilters(searchParams), [searchParams])
    
    const [filters, setFilters] = useState<MovieFilters>(initialFilters)
    const [appliedFilters, setAppliedFilters] = useState<MovieFilters>(initialFilters)

    const applyFilters = () => {
        setAppliedFilters(filters)
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            FILTER_PARAMS.forEach(param => {
                newParams.delete(param)
            })
            const filterParams = serializeFilters(filters)
            Object.entries(filterParams).forEach(([key, value]) => {
                if (value) {
                    newParams.set(key, value)
                }
            })
            return newParams
        })
    }

    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        setAppliedFilters(DEFAULT_FILTERS)
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            FILTER_PARAMS.forEach(param => {
                newParams.delete(param)
            })
            return newParams
        })
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

            const matchesReleaseDate =
                (!fromYear || (year && year >= fromYear)) &&
                (!toYear || (year && year <= toYear))

            const rating = movie.vote_average || 0
            const minRating = appliedFilters.rating.from
                ? Number(appliedFilters.rating.from)
                : null
            const maxRating = appliedFilters.rating.to
                ? Number(appliedFilters.rating.to)
                : null
            const matchesRating =
                (!minRating || rating >= minRating) &&
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
