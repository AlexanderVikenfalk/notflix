import type { MovieSearchResult, MovieDetails } from '@/types/api/movie'
import type { MovieCardData } from '@/types/ui/movieCard'

export const toMovieCardData = (
    movie: MovieSearchResult | MovieDetails
): MovieCardData => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    genres: 'genres' in movie
        ? movie.genres.map((g) => g.name)
        : undefined,
})