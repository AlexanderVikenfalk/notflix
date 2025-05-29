interface CardProps {
    movie: MovieSearchResult
}

export interface MovieSearchResponse {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    results: MovieSearchResult[]
    total_pages: number
    total_results: number
}

export interface MovieSearchResult {
    id: number
    title: string
    original_title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    overview: string
    genre_ids: number[]
    vote_average: number
    vote_count: number
    popularity: number
    adult: boolean
    video: boolean
    original_language: string
}

export interface MovieDetail extends MovieSearchResult {
    plot: string
    director: string
    cast: CastMember[]
    genres: Genre[]
}

export interface CastMember {
    id: number
    name: string
    character?: string
}

export interface Genre {
    id: number
    name: string
}
