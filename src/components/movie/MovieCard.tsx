import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FavoritesToggle } from '@/components/movie/FavoritesToggle'
import type { MovieSearchResult } from '@/types/api/movie'

interface MovieCardProps {
    movie: MovieSearchResult
}

const MovieCardComponent = ({ movie }: MovieCardProps) => {
    const releaseYear = movie.release_date?.slice(0, 4) || ''

    return (
        <article
            className="text-center text-sm group relative"
            itemScope
            itemType="https://schema.org/Movie"
        >
            <div className="absolute top-2 right-2 z-10">
                <FavoritesToggle movie={movie} />
            </div>

            <Link
                to={`/movie/${movie.id}`}
                className="block w-full h-[300px] bg-slate-300 dark:bg-slate-700 rounded-md overflow-hidden"
                itemProp="url"
            >
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    itemProp="image"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = '/assets/images/placeholder.webp'
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 will-change-transform"
                />
            </Link>

            <Link
                to={`/movie/${movie.id}`}
                className="block mt-2 font-semibold text-gray-900 dark:text-white truncate focus-visible:ring-2 w-3/4 mx-auto"
                itemProp="name"
            >
                {movie.title}
            </Link>
            <meta itemProp="datePublished" content={movie.release_date} />

            <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs w-1/4 mx-auto">
                {releaseYear}
            </p>
        </article>
    )
}

MovieCardComponent.displayName = 'MovieCard'

export const MovieCard = memo(MovieCardComponent)
