import { useNavigate } from 'react-router-dom'
import CircleHeartIcon from '@/assets/svg/circle-heart.svg?react'

export const FavoritesPageButton = () => {
    const navigate = useNavigate()

    return (
        <button
            type="button"
            aria-label="Favorites"
            title="Favorites"
            onClick={() => navigate('/favorites')}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            <CircleHeartIcon className="w-5 h-5 text-gray-700 dark:text-white cursor-pointer" />
        </button>
    )
}