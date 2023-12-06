import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Checkout from '../pages/Checkout'
import Products from '../pages/Products'
import AboutUs from '../pages/AboutUs'
import Admin from '../pages/AdminPanel'



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
                path: "/Products/:itemName",
                element: <Products/>, 
            },
            {
                path: "/AboutUs",
                element: <AboutUs/>, 
            },
            {
                path: "/admin",
                element: <Admin/>, 
            }
        ],
    },
])

export default router;
