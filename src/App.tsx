import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'

function App() {
    return (
        <div className="bg-blue-950 h-screen">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
        </div>
    )
}

export default App
