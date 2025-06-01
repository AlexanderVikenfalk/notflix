import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from 'react'
import type {
    FavoriteMovie,
    MovieDetails,
    MovieSearchResult,
} from '@/types/interfaces'

const STORAGE_KEY = 'favorites'

interface FavoritesState {
    favorites: FavoriteMovie[]
}

interface FavoritesContextType extends FavoritesState {
    addFavorite: (movie: MovieDetails | MovieSearchResult) => void
    removeFavorite: (id: number) => void
    isFavorite: (id: number) => boolean
}

type FavoritesAction =
    | { type: 'ADD_FAVORITE'; payload: FavoriteMovie }
    | { type: 'REMOVE_FAVORITE'; payload: number }
    | { type: 'LOAD_FAVORITES'; payload: FavoriteMovie[] }

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

const loadFavoritesFromStorage = (): FavoriteMovie[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        console.warn('Failed to load favorites from localStorage')
        return []
    }
}

const saveFavoritesToStorage = (favorites: FavoriteMovie[]) => {
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
        const normalized: FavoriteMovie = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
        }
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

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
