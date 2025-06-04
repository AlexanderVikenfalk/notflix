import { Button } from './Button'

interface ErrorMessageProps {
    title?: string
    message: string
    action?: {
        label: string
        onClick: () => void
    }
}

export const ErrorMessage = ({
    title = 'Error',
    message,
    action,
}: ErrorMessageProps) => {
    return (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 max-w-2xl mx-auto my-8">
            <div>
                <h3 className="text-base font-medium text-red-800 dark:text-red-200">
                    {title}
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{message}</p>
                </div>
                {action && (
                    <div className="mt-4">
                        <Button variant="primary" onClick={action.onClick}>
                            {action.label}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
