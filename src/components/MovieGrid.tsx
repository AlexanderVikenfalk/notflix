import { MovieCard, MovieCardSkeleton } from '@/components'
import type { MovieSearchResult } from '@/types/interfaces'
import { Pagination } from '@/components/pagination/Pagination'

type Props = {
    movies: MovieSearchResult[]
    loading: boolean
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    emptyMessage?: string
}

export const MovieGrid = ({
    movies,
    loading,
    totalPages,
    currentPage,
    onPageChange,
    emptyMessage = 'No movies to display',
}: Props) => {
    return (
        <section className="max-w-7xl mx-auto py-7">
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-8">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <MovieCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </div>
            ) : movies.length === 0 ? (
                <p className="text-3xl text-gray-700 dark:text-white">
                    {emptyMessage}
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-8">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
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
