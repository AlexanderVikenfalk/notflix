import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
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

jest.mock('../../search/SearchInput', () => ({
    SearchInput: ({
        value,
        onChange,
        onSearch,
    }: {
        value: string
        onChange: (value: string) => void
        onSearch: () => void
    }) => (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
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

jest.mock('@/hooks/useDebounce', () => ({
    useDebounce: (value: string) => value,
}))

describe('Header', () => {
    const mockNavigate = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
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

    it('navigates to search results when typing in search input', () => {
        render(<Header />)

        const searchInput = screen.getByTestId('search-input')
        fireEvent.change(searchInput, { target: { value: 'test movie' } })

        expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20movie')
    })

    it('does not navigate on empty search', () => {
        render(<Header />)

        const searchInput = screen.getByTestId('search-input')
        fireEvent.change(searchInput, { target: { value: '   ' } })

        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('navigates immediately on Enter key', () => {
        render(<Header />)

        const searchInput = screen.getByTestId('search-input')
        fireEvent.change(searchInput, { target: { value: 'instant search' } })
        fireEvent.keyDown(searchInput, { key: 'Enter' })

        expect(mockNavigate).toHaveBeenCalledWith('/search?q=instant%20search')
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
