import type { MovieSearchResult } from '@/types/interfaces'

interface CardProps {
    movie: MovieSearchResult
}

export const Card = ({ movie }: CardProps) => {
    return (
        <div key={movie.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-sm">
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mt-2 text-center text-sm text-white">
                <p className="font-semibold truncate">{movie.title}</p>
                <p className="text-gray-400 text-xs">
                    {new Date(movie.release_date).getFullYear()}
                </p>
            </div>
        </div>
    )
}
