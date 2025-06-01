import { memo } from 'react'
import type { MovieSearchResult } from '@/types/interfaces'
import { Link } from 'react-router-dom'

interface CardProps {
    movie: MovieSearchResult
}

const MovieCardComponent = ({ movie }: CardProps) => {
    return (
        <div key={movie.id} className="group cursor-pointer">
            <Link to={`/movie/${movie.id}`}>
                <div className="overflow-hidden rounded-sm relative">
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-auto object-cover transition-transform duration-[400ms] ease-in-out scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-400 dark:group-hover:border-white pointer-events-none" />
                </div>
                <div className="mt-2 text-center text-sm">
                    <p className="font-semibold truncate">{movie.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                </div>
            </Link>
        </div>
    )
}

MovieCardComponent.displayName = 'MovieCard'

export const MovieCard = memo(MovieCardComponent)
