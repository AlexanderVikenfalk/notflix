import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { FavoritesProvider } from '@/context/FavoritesContext'

import './styles/main.css'

if (import.meta.env.DEV) {
    ;(async () => {
        const { worker } = await import('./mocks/browser')
        await worker.start()
    })()
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FavoritesProvider>
            <RouterProvider router={router} />
        </FavoritesProvider>
    </StrictMode>
)
