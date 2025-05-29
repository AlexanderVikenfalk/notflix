import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default App
