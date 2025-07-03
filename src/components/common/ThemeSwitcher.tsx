import { useEffect } from 'react'
import MoonIcon from '@/assets/svg/moon.svg?react'
import SunIcon from '@/assets/svg/sun.svg?react'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { Button } from '@/components/common/Button'

export const ThemeSwitcher = () => {
    const getInitialIsDarkMode = () => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    }

    const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
        getInitialIsDarkMode(),
        'dark'
    )

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <Button
            type="button"
            onClick={() => setIsDarkMode((prev: boolean) => !prev)}
            variant="icon"
            title="Toggle theme"
            aria-label="Toggle theme"
            className="p-2 transition-transform duration-200 ease-in-out"
        >
            <span className="block">
                {isDarkMode ? (
                    <SunIcon className="w-5 h-5" />
                ) : (
                    <MoonIcon className="w-5 h-5" />
                )}
            </span>
        </Button>
    )
}
