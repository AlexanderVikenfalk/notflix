import { type ReactNode } from 'react'

interface PaginationButtonProps {
    onClick: () => void
    disabled: boolean
    isActive?: boolean
    children: ReactNode
    'aria-label': string
    title?: string
    'aria-current'?: 'page'
}

const buttonBaseClass =
    'min-w-[44px] h-11 flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
const buttonEnabledClass =
    'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
const buttonDisabledClass =
    'text-gray-400 dark:text-gray-600 cursor-not-allowed'
const buttonActiveClass =
    'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold underline hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer px-2'

export const PaginationButton = ({
    onClick,
    disabled,
    isActive = false,
    children,
    'aria-label': ariaLabel,
    title,
    'aria-current': ariaCurrent,
}: PaginationButtonProps) => {
    const getButtonClass = () => {
        if (isActive) return `${buttonBaseClass} ${buttonActiveClass}`
        if (disabled) return `${buttonBaseClass} ${buttonDisabledClass}`
        return `${buttonBaseClass} ${buttonEnabledClass}`
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={getButtonClass()}
            aria-label={ariaLabel}
            title={title}
            aria-current={ariaCurrent}
        >
            {children}
        </button>
    )
}
