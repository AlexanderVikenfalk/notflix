import type { GenreName } from '@/constants/filtering'

export interface Filters {
    genre: GenreName[]
    releaseDate: { from: string; to: string }
    rating: { from: string; to: string }
} 