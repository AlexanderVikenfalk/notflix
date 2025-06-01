import {Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchInput } from './SearchInput'
import { ThemeSwitcher } from './ThemeSwitcher'
import {FavoritesPageButton} from './FavoritesPageButton'

export const Header = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')
    const debouncedValue = useDebounce(inputValue, 500)

    useEffect(() => {
        if (debouncedValue.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(debouncedValue)}`)
        }
    }, [debouncedValue, navigate])

    return (
        <header className="sticky top-0 z-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-800 dark:text-white"
                >
                    notflix
                </Link>
                <div className="flex items-center gap-3 w-full max-w-lg">
                    <SearchInput value={inputValue} onChange={setInputValue} />
                    <ThemeSwitcher />
                    <FavoritesPageButton />
                </div>
            </div>
        </header>
    )
}