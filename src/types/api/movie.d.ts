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

export interface MovieDetails extends MovieSearchResult {
    runtime: number
    budget: number
    revenue: number
    imdb_id: string
    genres: { id: number; name: string }[]
    director?: string
    cast?: string[]
}
