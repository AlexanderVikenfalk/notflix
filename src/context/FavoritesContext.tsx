import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from 'react'
import type { MovieDetails } from '@/types/interfaces'

// Constants
const STORAGE_KEY = 'favorites'

// Types
interface FavoritesState {
    favorites: MovieDetails[]
}

interface FavoritesContextType extends FavoritesState {
    addFavorite: (movie: MovieDetails) => void
    removeFavorite: (id: number) => void
    isFavorite: (id: number) => boolean
}

// Actions
type FavoritesAction =
    | { type: 'ADD_FAVORITE'; payload: MovieDetails }
    | { type: 'REMOVE_FAVORITE'; payload: number }
    | { type: 'LOAD_FAVORITES'; payload: MovieDetails[] }

const initialState: FavoritesState = {
    favorites: [],
}

// Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
)

// Reducer
function favoritesReducer(
    state: FavoritesState,
    action: FavoritesAction
): FavoritesState {
    switch (action.type) {
        case 'LOAD_FAVORITES':
            return { favorites: action.payload }

        case 'ADD_FAVORITE': {
            const exists = state.favorites.some(
                (m) => m.id === action.payload.id
            )
            if (exists) return state
            return { favorites: [...state.favorites, action.payload] }
        }

        case 'REMOVE_FAVORITE': {
            return {
                favorites: state.favorites.filter(
                    (m) => m.id !== action.payload
                ),
            }
        }

        default:
            return state
    }
}

// Helper Functions
const loadFavoritesFromStorage = (): MovieDetails[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        console.warn('Failed to load favorites from localStorage')
        return []
    }
}

const saveFavoritesToStorage = (favorites: MovieDetails[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
        console.warn('Failed to save favorites to localStorage')
    }
}

// Provider
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState)

    // Load favorites on mount
    useEffect(() => {
        const storedFavorites = loadFavoritesFromStorage()
        if (storedFavorites.length > 0) {
            dispatch({ type: 'LOAD_FAVORITES', payload: storedFavorites })
        }
    }, [])

    // Save favorites when they change
    useEffect(() => {
        if (state.favorites.length > 0) {
            saveFavoritesToStorage(state.favorites)
        }
    }, [state.favorites])

    const addFavorite = (movie: MovieDetails) => {
        dispatch({ type: 'ADD_FAVORITE', payload: movie })
    }

    const removeFavorite = (id: number) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: id })
    }

    const isFavorite = (id: number) => {
        return state.favorites.some((movie) => movie.id === id)
    }

    return (
        <FavoritesContext.Provider
            value={{
                ...state,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

// Hook
export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
