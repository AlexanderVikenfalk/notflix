import { useState, useEffect } from 'react'
import MoonIcon from '@/assets/svg/moon.svg?react'
import SunIcon from '@/assets/svg/Sun.svg?react'

export const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(() =>
        document.documentElement.classList.contains('dark')
    )

    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', darkMode)
    }, [darkMode])

    return (
        <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            title="Toggle theme"
        >
            {darkMode ? (
                <SunIcon className="w-5 h-5 text-gray-700 dark:text-white" />
            ) : (
                <MoonIcon className="w-5 h-5 text-gray-700 dark:text-white" />
            )}
        </button>
    )
}