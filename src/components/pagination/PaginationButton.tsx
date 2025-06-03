import { type ReactNode } from 'react'
import { Button } from '@/components/commons/Button'

interface PaginationButtonProps {
    onClick: () => void
    disabled: boolean
    isActive?: boolean
    children: ReactNode
    'aria-label': string
    title?: string
    'aria-current'?: 'page'
}

export const PaginationButton = ({
    onClick,
    disabled,
    isActive = false,
    children,
    'aria-label': ariaLabel,
    title,
    'aria-current': ariaCurrent,
}: PaginationButtonProps) => {
    const variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'secondary'
    let className = 'min-w-[44px] h-11 px-2 font-medium'

    if (isActive) {
        className +=
            ' bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold underline'
    }

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            aria-label={ariaLabel}
            title={title}
            aria-current={ariaCurrent}
            className={className}
        >
            {children}
        </Button>
    )
}
