import type { MovieCardData } from '@/types/ui/movieCard'

interface Props {
    movie: MovieCardData
}

export const MovieCard = ({ movie }: Props) => {
    const releaseYear = movie.release_date?.slice(0, 4) || ''
    const genres = movie.genres ?? []

    return (
        <article
            itemScope
            itemType="https://schema.org/Movie"
            className="rounded shadow-md overflow-hidden bg-white dark:bg-gray-800"
        >
            <a href={`/movie/${movie.id}`} itemProp="url">
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    itemProp="image"
                    className="w-full h-auto"
                />
            </a>

            <div className="p-3">
                <h3 itemProp="name" className="text-lg font-semibold truncate">
                    {movie.title}
                </h3>
                <meta itemProp="datePublished" content={movie.release_date} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {releaseYear}
                </p>
                {genres.length > 0 && (
                    <meta itemProp="genre" content={genres.join(', ')} />
                )}
            </div>
        </article>
    )
}
