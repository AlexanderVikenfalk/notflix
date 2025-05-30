import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

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
        <header>
            <input
                type="text"
                id="search-navbar"
                name="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                autoComplete="off"
            />
        </header>
    )
}
