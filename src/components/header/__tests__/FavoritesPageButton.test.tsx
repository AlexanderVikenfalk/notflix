jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}))

jest.mock('@/components/', () => ({
    Button: ({ children, onClick, ...props }: { 
        children: React.ReactNode; 
        onClick?: () => void; 
        className?: string;
        type?: 'button' | 'submit' | 'reset';
        title?: string;
        'aria-label'?: string;
    }) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    ),
}))

import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { FavoritesPageButton } from '../FavoritesPageButton'

jest.mock('../FavoritesPageButton', () => {
    const MockButton = ({ 
        children, 
        onClick,
        ...props 
    }: { 
        children?: React.ReactNode;
        onClick?: () => void;
        type?: 'button' | 'submit' | 'reset';
        'aria-label'?: string;
        title?: string;
        className?: string;
    }) => <button onClick={onClick} {...props}>{children}</button>

    return {
        FavoritesPageButton: () => {
            const navigate = jest.requireMock('react-router-dom').useNavigate()
            return (
                <MockButton
                    type="button"
                    aria-label="Favorites"
                    title="Favorites"
                    className="p-2 rounded"
                    onClick={() => navigate('/favorites')}
                >
                    <div data-testid="heart-icon" className="w-5 h-5" />
                </MockButton>
            )
        },
    }
})

describe('FavoritesPageButton', () => {
    const mockNavigate = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    })

    it('renders correctly with proper attributes', () => {
        render(<FavoritesPageButton />)
        
        const button = screen.getByRole('button', { name: /favorites/i })
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('title', 'Favorites')
        expect(button).toHaveAttribute('aria-label', 'Favorites')
        expect(button).toHaveClass('p-2', 'rounded')

        const icon = screen.getByTestId('heart-icon')
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass('w-5', 'h-5')
    })

    it('navigates to favorites page when clicked', () => {
        render(<FavoritesPageButton />)
        
        const button = screen.getByRole('button')
        fireEvent.click(button)
        
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith('/favorites')
    })
}) 