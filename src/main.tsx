import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LoadingProvider } from '@/context/LoadingContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { router } from './router'
import './styles/main.css'

async function prepareApp() {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser')
        await worker.start()
    }

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <LoadingProvider>
                <FavoritesProvider>
                    <RouterProvider router={router} />
                </FavoritesProvider>
            </LoadingProvider>
        </StrictMode>
    )
}

prepareApp()
