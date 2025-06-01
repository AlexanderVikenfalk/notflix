import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { LinearProgress } from '@mui/material'
import { Header, Footer } from '@/components'
import { useLoading } from '@/context/LoadingContext.tsx'

function App() {
    const { loading } = useLoading()

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">
            <ToastContainer />
            {loading && <LinearProgress className="!fixed !w-full !z-2" />}
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App
