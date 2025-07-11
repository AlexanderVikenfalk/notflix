import { useState, useEffect } from 'react'
import HeartIcon from '@/assets/svg/heart.svg?react'
import { useFavorites } from '@/contexts/FavoritesContext'
import type { MovieDetails, MovieSearchResult } from '@/types/api/movie'

export const FavoritesToggle = ({
    movie,
}: {
    movie: MovieDetails | MovieSearchResult
}) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites()
    const [isAnimating, setIsAnimating] = useState(false)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const isInFavorites = favorites.some((fav) => fav.id === movie.id)
        setAdded(isInFavorites)
    }, [favorites, movie.id])

    const toggleFavorite = () => {
        if (added) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }

        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 150)
    }

    return (
        <button
            type="button"
            aria-label={added ? 'Remove from favorites' : 'Add to favorites'}
            title={added ? 'Remove from favorites' : 'Add to favorites'}
            onClick={toggleFavorite}
            className="opacity-70 hover:opacity-100 hover:scale-110 transition"
        >
            <HeartIcon
                className={`w-8 h-8 cursor-pointer stroke-red-800 transition-all duration-150 ease-out
                    ${added ? 'fill-red-800' : 'fill-none'}
                    ${isAnimating ? 'scale-125' : 'scale-100'}
                `}
            />
        </button>
    )
}
