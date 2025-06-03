import { memo } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { MovieCardSkeleton } from '@/components/skeletons/MovieCardSkeleton'
import { Pagination } from '@/components/pagination/Pagination'
import type { MovieSearchResult } from '@/types/api/movie'

type Props = {
    movies: MovieSearchResult[]
    loading: boolean
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    emptyMessage?: string
}

export const MovieGridComponent = ({
    movies,
    loading,
    totalPages,
    currentPage,
    onPageChange,
    emptyMessage = 'No movies to display',
}: Props) => {
    return (
        <section className="max-w-7xl mx-auto py-7">
            <h1 className="sr-only">
                Movie list – page {currentPage} of {totalPages}
            </h1>

            {loading ? (
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-8">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <li key={`skeleton-${i}`}>
                            <MovieCardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : movies.length === 0 ? (
                <p className="text-3xl text-gray-700 dark:text-white text-center mt-8">
                    {emptyMessage}
                </p>
            ) : (
                <ul
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-8"
                    itemScope
                    itemType="https://schema.org/ItemList"
                >
                    {movies.map((movie) => (
                        <li key={movie.id} itemProp="itemListElement">
                            <MovieCard movie={movie} />
                        </li>
                    ))}
                </ul>
            )}

            {!loading && totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        onChange={onPageChange}
                    />
                </div>
            )}
        </section>
    )
}

MovieGridComponent.displayName = 'MovieGridComponent'
export const MovieGrid = memo(MovieGridComponent)
