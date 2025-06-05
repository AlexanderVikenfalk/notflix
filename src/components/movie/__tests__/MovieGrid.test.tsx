import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MovieGrid } from '@/components/movie/MovieGrid'
import type { MovieSearchResult } from '@/types/api/movie'

jest.mock('@/components/movie/MovieCard', () => ({
    MovieCard: ({ movie }: { movie: MovieSearchResult }) => (
        <div data-testid="movie-card">Movie: {movie.title}</div>
    ),
}))

jest.mock('@/components/skeletons/MovieCardSkeleton', () => ({
    MovieCardSkeleton: () => (
        <div data-testid="movie-card-skeleton">Loading...</div>
    ),
}))

jest.mock('@/components/pagination/Pagination', () => ({
    Pagination: ({
        page,
        count,
        onChange,
    }: {
        page: number
        count: number
        onChange: (page: number) => void
    }) => (
        <nav data-testid="pagination">
            <button onClick={() => onChange(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <span>
                Page {page} of {count}
            </span>
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === count}
            >
                Next
            </button>
        </nav>
    ),
}))

describe('MovieGrid', () => {
    const mockMovies: MovieSearchResult[] = [
        {
            id: 1,
            title: 'Test Movie 1',
            poster_path: '/test1.jpg',
            release_date: '2023-01-01',
            genre_ids: [1],
            overview: 'Test overview 1',
            vote_average: 7.5,
            vote_count: 100,
            adult: false,
            backdrop_path: '/backdrop1.jpg',
            original_language: 'en',
            original_title: 'Test Movie 1',
            popularity: 100,
            video: false,
        },
        {
            id: 2,
            title: 'Test Movie 2',
            poster_path: '/test2.jpg',
            release_date: '2023-02-02',
            genre_ids: [2],
            overview: 'Test overview 2',
            vote_average: 8.0,
            vote_count: 200,
            adult: false,
            backdrop_path: '/backdrop2.jpg',
            original_language: 'en',
            original_title: 'Test Movie 2',
            popularity: 200,
            video: false,
        },
    ]

    const defaultProps = {
        movies: mockMovies,
        loading: false,
        totalPages: 1,
        currentPage: 1,
        onPageChange: jest.fn(),
    }

    const renderMovieGrid = (props = {}) => {
        return render(
            <MemoryRouter>
                <MovieGrid {...defaultProps} {...props} />
            </MemoryRouter>
        )
    }

    it('renders loading skeletons when loading is true', () => {
        renderMovieGrid({ loading: true })
        const skeletons = screen.getAllByTestId('movie-card-skeleton')
        expect(skeletons).toHaveLength(15)
    })

    it('renders loading skeletons when movies is undefined', () => {
        renderMovieGrid({ movies: undefined })
        const skeletons = screen.getAllByTestId('movie-card-skeleton')
        expect(skeletons).toHaveLength(15)
    })

    it('renders empty message when no movies are available', () => {
        renderMovieGrid({ movies: [] })
        expect(screen.getByText('No movies to display')).toBeInTheDocument()
    })

    it('renders custom empty message when provided', () => {
        const customMessage = 'Custom empty message'
        renderMovieGrid({ movies: [], emptyMessage: customMessage })
        expect(screen.getByText(customMessage)).toBeInTheDocument()
    })

    it('renders movie cards for each movie', () => {
        renderMovieGrid()
        const movieCards = screen.getAllByTestId('movie-card')
        expect(movieCards).toHaveLength(mockMovies.length)
        expect(screen.getByText('Movie: Test Movie 1')).toBeInTheDocument()
        expect(screen.getByText('Movie: Test Movie 2')).toBeInTheDocument()
    })

    it('includes proper schema.org markup for movie list', () => {
        renderMovieGrid()
        const list = screen.getByRole('list')
        expect(list).toHaveAttribute('itemType', 'https://schema.org/ItemList')
        const listItems = screen.getAllByRole('listitem')
        listItems.forEach((item) => {
            expect(item).toHaveAttribute('itemProp', 'itemListElement')
        })
    })

    it('shows pagination when there are multiple pages', () => {
        renderMovieGrid({ totalPages: 3, currentPage: 2 })
        expect(screen.getByTestId('pagination')).toBeInTheDocument()
        expect(screen.getByText('Page 2 of 3')).toBeInTheDocument()
    })

    it('hides pagination when there is only one page', () => {
        renderMovieGrid({ totalPages: 1 })
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    })

    it('hides pagination when loading', () => {
        renderMovieGrid({ loading: true, totalPages: 3 })
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
    })

    it('calls onPageChange when pagination is clicked', async () => {
        const onPageChange = jest.fn()
        renderMovieGrid({ totalPages: 3, currentPage: 2, onPageChange })

        const user = userEvent.setup()
        await user.click(screen.getByText('Next'))

        expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('includes current page in aria-label', () => {
        renderMovieGrid({ totalPages: 3, currentPage: 2 })
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toHaveTextContent('Movie list – page 2 of 3')
    })
})
