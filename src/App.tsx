import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { Header, Footer, Loader } from '@/components'

function App() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">
            <ToastContainer />
            <Header />
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}

export default App
