export const GENRE_NAMES = [
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
] as const

export type GenreName = (typeof GENRE_NAMES)[number]

export const GENRE_MAP: Record<GenreName, number> = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    Thriller: 53,
    War: 10752,
    Western: 37,
}

export const GENRE_MAP_REVERSE: Record<number, GenreName> = Object.fromEntries(
    Object.entries(GENRE_MAP).map(([k, v]) => [v, k])
) as Record<number, GenreName>

export const DEFAULT_FILTERS = {
    genre: [] as GenreName[],
    releaseDate: { from: '', to: '' },
    rating: { from: '', to: '' },
}
