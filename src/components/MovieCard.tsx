import { memo } from 'react'
import type { MovieForCard, MovieSearchResult } from '@/types/interfaces'
import { Link } from 'react-router-dom'

interface MovieCardProps {
    movie: MovieForCard
}
import { FavoritesToggleButton } from '@/components'

const MovieCardComponent = ({ movie }: MovieCardProps) => {
    return (
        <div className="text-center text-sm group relative">
            <div className="absolute top-2 right-2 z-10">
                <FavoritesToggleButton movie={movie as MovieSearchResult} />
            </div>

            <Link
                to={`/movie/${movie.id}`}
                className="block overflow-hidden rounded-md focus-visible:ring-2 transition-shadow"
            >
                <img
                    src={movie.poster_path}
                    alt={movie.title || 'Movie poster'}
                    onError={(e) => {
                        const target = e.currentTarget
                        target.onerror = null
                        target.src = '/assets/images/fallback-poster.webp'
                    }}
                    className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 will-change-transform"
                />

            </Link>

            <Link
                to={`/movie/${movie.id}`}
                className="block mt-2 font-semibold text-gray-900 dark:text-white truncate focus-visible:ring-2"
            >
                {movie.title}
            </Link>

            <p className="text-gray-500 dark:text-gray-400 text-xs">
                {new Date(movie.release_date).getFullYear()}
            </p>
        </div>
    )
}

MovieCardComponent.displayName = 'MovieCard'

export const MovieCard = memo(MovieCardComponent)
