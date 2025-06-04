import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SearchInput } from '../search/SearchInput'
import { ThemeSwitcher } from '../common/ThemeSwitcher'
import { FavoritesButton } from './FavoritesButton'
import { useSearch } from '@/contexts/SearchContext'

export const Header = () => {
    const { query, setQuery } = useSearch()
    const [inputValue, setInputValue] = useState(query)

    useEffect(() => {
        setInputValue(query)
    }, [query])

    const handleChange = (value: string) => {
        setInputValue(value)
        setQuery(value)
    }

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
                            onChange={handleChange}
                        />
                    </div>

                    <ThemeSwitcher />
                    <FavoritesButton />
                </div>
            </div>
        </header>
    )
}
