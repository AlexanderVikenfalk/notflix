import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { Header, Footer, Loader } from '@/components'

function App() {
    return (
        <div className="bg-blue-950 min-h-screen">
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
