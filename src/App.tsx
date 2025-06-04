import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/components/layout/Header'
import { ScrollToTopOnPathChange } from '@/components/common/ScrollToTopOnPathChange'
import { SearchProvider } from '@/contexts/SearchContext.tsx'

function App() {
    return (
        <SearchProvider>
            <div
                id="app"
                className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white"
            >
                <ScrollToTopOnPathChange />
                <Header />
                <Outlet />
                <ToastContainer />
            </div>
        </SearchProvider>
    )
}

export default App
