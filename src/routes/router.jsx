import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import Register from '../components/Register'
import Checkout from '../pages/Checkout'
import Products from '../pages/products'


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
                path: "/SignIn",
                element: <SignIn />,
            },
            {
                path: "/Me",
                element: <Profile />
            },
            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/Checkout",
                element: <Checkout />,
            },
            {
                path: "/Products",
                element: <Products />,
            }
        ],
    },
])

export default router;
