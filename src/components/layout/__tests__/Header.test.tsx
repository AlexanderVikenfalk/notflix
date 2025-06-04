import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { useSearch } from '@/contexts/SearchContext'

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
    Link: ({
        to,
        children,
        ...props
    }: {
        to: string
        children: React.ReactNode
    }) => (
        <a href={to} {...props}>
            {children}
        </a>
    ),
}))

jest.mock('@/contexts/SearchContext', () => ({
    useSearch: jest.fn(),
}))

jest.mock('../../search/SearchInput', () => ({
    SearchInput: ({
        value,
        onChange,
    }: {
        value: string
        onChange: (value: string) => void
    }) => (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search movies..."
            data-testid="search-input"
        />
    ),
}))

jest.mock('../../common/ThemeSwitcher', () => ({
    ThemeSwitcher: () => <button data-testid="theme-switcher">Theme</button>,
}))

jest.mock('../FavoritesButton', () => ({
    FavoritesButton: () => (
        <button data-testid="favorites-button">Favorites</button>
    ),
}))

describe('Header', () => {
    const mockNavigate = jest.fn()
    const mockSetQuery = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
        ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/' })
        ;(useSearch as jest.Mock).mockReturnValue({
            query: '',
            setQuery: mockSetQuery,
        })
    })

    it('renders all components correctly', () => {
        render(<Header />)

        expect(screen.getByText('notflix')).toBeInTheDocument()
        expect(screen.getByText('notflix').closest('a')).toHaveAttribute(
            'href',
            '/'
        )

        expect(screen.getByTestId('search-input')).toBeInTheDocument()
        expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
        expect(screen.getByTestId('favorites-button')).toBeInTheDocument()
    })

    it('updates search query and navigates to search page when not on search page', () => {
        render(<Header />)

        const searchInput = screen.getByTestId('search-input')
        fireEvent.change(searchInput, { target: { value: 'test movie' } })

        expect(mockSetQuery).toHaveBeenCalledWith('test movie')
        expect(mockNavigate).toHaveBeenCalledWith('/search')
    })

    it('only updates search query when already on search page', () => {
        ;(useLocation as jest.Mock).mockReturnValue({ pathname: '/search' })
        render(<Header />)

        const searchInput = screen.getByTestId('search-input')
        fireEvent.change(searchInput, { target: { value: 'test movie' } })

        expect(mockSetQuery).toHaveBeenCalledWith('test movie')
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('updates input value when query changes', () => {
        ;(useSearch as jest.Mock).mockReturnValue({
            query: 'initial query',
            setQuery: mockSetQuery,
        })
        
        const { rerender } = render(<Header />)
        expect(screen.getByTestId('search-input')).toHaveValue('initial query')

        ;(useSearch as jest.Mock).mockReturnValue({
            query: 'updated query',
            setQuery: mockSetQuery,
        })
        
        rerender(<Header />)
        expect(screen.getByTestId('search-input')).toHaveValue('updated query')
    })

    it('has correct styling classes', () => {
        render(<Header />)

        const header = screen.getByRole('banner')
        expect(header).toHaveClass(
            'sticky',
            'top-0',
            'z-100',
            'bg-white',
            'dark:bg-gray-900',
            'border-b',
            'border-gray-200',
            'dark:border-gray-700'
        )

        const container = header.firstElementChild
        expect(container).toHaveClass(
            'max-w-7xl',
            'mx-auto',
            'px-4',
            'sm:px-6',
            'py-3',
            'flex',
            'items-center',
            'gap-3'
        )
    })
})
