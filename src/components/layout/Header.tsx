import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchInput } from '../search/SearchInput'
import { ThemeSwitcher } from '../common/ThemeSwitcher'
import { FavoritesButton } from './FavoritesButton'

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
        <header className="sticky top-0 z-100 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
                <div className="flex-shrink-0">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-gray-800 dark:text-white"
                    >
                        notflix
                    </Link>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="max-w-xs w-full">
                        <SearchInput
                            value={inputValue}
                            onChange={setInputValue}
                            onSearch={() => {
                                if (inputValue.trim() !== '') {
                                    navigate(
                                        `/search?q=${encodeURIComponent(inputValue)}`
                                    )
                                }
                            }}
                        />
                    </div>

                    <ThemeSwitcher />
                    <FavoritesButton />
                </div>
            </div>
        </header>
    )
}
