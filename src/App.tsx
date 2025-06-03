import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { LinearProgress } from '@mui/material'
import { Header } from '@/components/header/Header'
import { ScrollToTopOnPathChange } from '@/components/ScrollToTopOnPathChange'
import { useLoading } from '@/context/LoadingContext'

function App() {
    const { loading } = useLoading()

    return (
        <div
            id="app"
            className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white"
        >
            <ScrollToTopOnPathChange />

            {loading && (
                <LinearProgress
                    className="!fixed !top-0 !left-0 !w-full !z-50"
                    role="status"
                    aria-label="Loading"
                />
            )}

            <Header />
            <Outlet />

            <ToastContainer />
        </div>
    )
}

export default App
