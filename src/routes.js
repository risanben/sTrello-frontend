import { HomePage } from './pages/home-page.jsx'
import { BoardPage } from './pages/board-page.jsx'
import { TempCmp } from './cmps/temp-cmp-render-task-details.jsx'

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
    },
    {
        path: 'temp',
        component: < TempCmp />,
        label: 'temp'
    }

    
]

export default routes