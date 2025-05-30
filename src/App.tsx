import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

function App() {
    return (
        <div className="bg-blue-950 min-h-screen">
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
