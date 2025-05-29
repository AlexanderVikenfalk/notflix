import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'

export const Header = () => {
    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        const queryTerm = formData.get('search') as string

        form.reset()
        navigate(`/search?q=${encodeURIComponent(queryTerm)}`)
    }

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search-navbar"
                    name="search"
                    className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    autoComplete="off"
                />
            </form>
        </header>
    )
}
