import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'
import Profile from '../pages/Profile'
import Register from '../components/Register'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/Me",
                element:<Profile/>
            },
            {
                path: "/Register",
                element: <Register />,
            },
        ],
    },
])

export default router;
