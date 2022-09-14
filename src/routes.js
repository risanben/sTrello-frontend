import { HomePage } from './pages/home-page.jsx'
import { BoardPage } from './pages/board-page.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'board',
        component: < BoardPage />,
        label: 'Boards'
    }
]

export default routes