import { useNavigate } from 'react-router-dom'
import CircleHeartIcon from '@/assets/svg/circle-heart.svg?react'
import { Button } from '@/components/commons/Button'

export const FavoritesPageButton = () => {
    const navigate = useNavigate()

    return (
        <Button
            type="button"
            aria-label="Favorites"
            title="Favorites"
            onClick={() => navigate('/favorites')}
            variant="icon"
            className="p-2 rounded"
        >
            <CircleHeartIcon className="w-5 h-5" />
        </Button>
    )
}
