import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/common/Button'

describe('Button', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('bg-blue-600')
    })

    it('renders different variants correctly', () => {
        const { rerender } = render(
            <Button variant="secondary">Secondary</Button>
        )
        expect(screen.getByRole('button')).toHaveClass('bg-gray-100')

        rerender(<Button variant="danger">Danger</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-red-600')

        rerender(<Button variant="ghost">Ghost</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-transparent')

        rerender(<Button variant="icon">Icon</Button>)
        expect(screen.getByRole('button')).toHaveClass('p-0')
    })

    it('applies loading state correctly', () => {
        render(<Button isLoading>Click me</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        expect(button).toHaveClass('opacity-50')
    })

    it('applies disabled state correctly', () => {
        render(<Button disabled>Click me</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        expect(button).toHaveClass('opacity-50')
    })

    it('applies custom className correctly', () => {
        render(<Button className="custom-class">Click me</Button>)
        const button = screen.getByRole('button')
        expect(button).toHaveClass('custom-class')
    })

    it('handles click events', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not trigger click when disabled', () => {
        const handleClick = jest.fn()
        render(
            <Button disabled onClick={handleClick}>
                Click me
            </Button>
        )

        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).not.toHaveBeenCalled()
    })
})
