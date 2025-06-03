import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MovieCard } from '@/components/MovieCard'
import type { MovieSearchResult } from '@/types/api/movie'

// Mock the FavoritesToggleButton component
jest.mock('@/components/FavoritesToggleButton', () => ({
    FavoritesToggleButton: ({ movie }: { movie: MovieSearchResult }) => (
        <button data-testid="favorites-toggle">
            Toggle favorite for {movie.title}
        </button>
    ),
}))

describe('MovieCard', () => {
    const mockMovie = {
        id: 123,
        title: 'Test Movie',
        poster_path: '/test-poster.jpg',
        release_date: '2023-01-01',
        genre_ids: [1, 2],
        overview: 'Test overview',
        vote_average: 7.5,
        vote_count: 100,
        adult: false,
        backdrop_path: '/test-backdrop.jpg',
        original_language: 'en',
        original_title: 'Test Movie',
        popularity: 100,
        video: false,
    } as MovieSearchResult

    const renderMovieCard = (movie = mockMovie) => {
        return render(
            <MemoryRouter>
                <MovieCard movie={movie} />
            </MemoryRouter>
        )
    }

    it('renders movie title', () => {
        renderMovieCard()
        expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })

    it('renders movie poster with correct alt text', () => {
        renderMovieCard()
        const poster = screen.getByRole('img')
        expect(poster).toHaveAttribute('src', '/test-poster.jpg')
        expect(poster).toHaveAttribute('alt', 'Test Movie')
    })

    it('renders release year', () => {
        renderMovieCard()
        expect(screen.getByText('2023')).toBeInTheDocument()
    })

    it('renders FavoritesToggleButton', () => {
        renderMovieCard()
        expect(screen.getByTestId('favorites-toggle')).toBeInTheDocument()
    })

    it('renders links to movie detail page', () => {
        renderMovieCard()
        const links = screen.getAllByRole('link')
        
        // Should have two links (image and title) pointing to the same URL
        expect(links).toHaveLength(2)
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/movie/123')
        })
    })

    it('includes proper schema.org markup', () => {
        renderMovieCard()
        const article = screen.getByRole('article')
        
        expect(article).toHaveAttribute('itemType', 'https://schema.org/Movie')
        expect(screen.getByText('Test Movie')).toHaveAttribute('itemProp', 'name')
        expect(screen.getByRole('img')).toHaveAttribute('itemProp', 'image')
        expect(screen.getAllByRole('link')[0]).toHaveAttribute('itemProp', 'url')
        
        // Check for meta tag with release date
        const metaTag = document.querySelector('meta[itemprop="datePublished"]')
        expect(metaTag).toHaveAttribute('content', '2023-01-01')
    })
}) 