import { DEFAULT_FILTERS } from '@/constants/filtering'
import type { GenreName } from '@/constants/filtering'

export type MovieFilters = typeof DEFAULT_FILTERS

export interface Filters {
    genre: GenreName[]
    releaseDate: { from: string; to: string }
    rating: { from: string; to: string }
} 