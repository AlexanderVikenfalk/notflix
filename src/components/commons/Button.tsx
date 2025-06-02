import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    className?: string
    isLoading?: boolean
}

export const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    disabled,
    className,
    ...props
}: ButtonProps) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded cursor-pointer'
    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm',
        secondary:
            'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        ghost: 'bg-transparent text-gray-700 dark:text-gray-200',
        icon: 'p-0 bg-transparent text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700',
    }

    return (
        <button
            type="button"
            className={cn(baseStyles, variants[variant], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {children}
        </button>
    )
}
