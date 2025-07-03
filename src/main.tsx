import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LoadingProvider } from '@/contexts/LoadingContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { router } from './router'
import './styles/main.css'

async function prepareApp() {
        const { worker } = await import('./mocks/browser')
        await worker.start()

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
