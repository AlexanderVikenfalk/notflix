import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from 'react'
import type { MovieDetails, MovieSearchResult } from '@/types/api/movie'
import type { MovieCardData } from '@/types/ui/movieCard'
import { toMovieCardData } from '@/utils/normalizeMovie'

const STORAGE_KEY = 'favorites'

interface FavoritesState {
    favorites: MovieCardData[]
}

type FavoritesAction =
    | { type: 'ADD_FAVORITE'; payload: MovieCardData }
    | { type: 'REMOVE_FAVORITE'; payload: number }
    | { type: 'LOAD_FAVORITES'; payload: MovieCardData[] }

interface FavoritesContextType extends FavoritesState {
    addFavorite: (movie: MovieDetails | MovieSearchResult) => void
    removeFavorite: (id: number) => void
    isFavorite: (id: number) => boolean
}

const initialState: FavoritesState = {
    favorites: [],
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
)

function favoritesReducer(
    state: FavoritesState,
    action: FavoritesAction
): FavoritesState {
    switch (action.type) {
        case 'LOAD_FAVORITES':
            return { favorites: action.payload }
        case 'ADD_FAVORITE':
            return state.favorites.some((m) => m.id === action.payload.id)
                ? state
                : { favorites: [...state.favorites, action.payload] }
        case 'REMOVE_FAVORITE':
            return {
                favorites: state.favorites.filter(
                    (m) => m.id !== action.payload
                ),
            }
        default:
            return state
    }
}

const loadFavoritesFromStorage = (): MovieCardData[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        console.warn('Failed to load favorites from localStorage')
        return []
    }
}

const saveFavoritesToStorage = (favorites: MovieCardData[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
        console.warn('Failed to save favorites to localStorage')
    }
}

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState)

    useEffect(() => {
        const storedFavorites = loadFavoritesFromStorage()
        if (storedFavorites.length > 0) {
            dispatch({ type: 'LOAD_FAVORITES', payload: storedFavorites })
        }
    }, [])

    useEffect(() => {
        saveFavoritesToStorage(state.favorites)
    }, [state.favorites])

    const addFavorite = (movie: MovieDetails | MovieSearchResult) => {
        const normalized = toMovieCardData(movie)
        dispatch({ type: 'ADD_FAVORITE', payload: normalized })
    }

    const removeFavorite = (id: number) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: id })
    }

    const isFavorite = (id: number) => {
        return state.favorites.some((movie) => movie.id === id)
    }

    return (
        <FavoritesContext.Provider
            value={{ ...state, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
