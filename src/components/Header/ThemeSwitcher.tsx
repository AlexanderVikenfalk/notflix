import { useEffect } from 'react'
import MoonIcon from '@/assets/svg/moon.svg?react'
import SunIcon from '@/assets/svg/Sun.svg?react'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'

export const ThemeSwitcher = () => {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    }

    const [darkMode, setDarkMode] = useLocalStorageState<boolean>(
        getInitialTheme(),
        'theme'
    )

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])

    return (
        <button
            type="button"
            onClick={() => setDarkMode((prev: boolean) => !prev)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300"
            title="Toggle theme"
        >
            <span className="block transition-transform duration-200 ease-in-out">
                {darkMode ? (
                    <SunIcon className="w-5 h-5" />
                ) : (
                    <MoonIcon className="w-5 h-5" />
                )}
            </span>
        </button>
    )
}
