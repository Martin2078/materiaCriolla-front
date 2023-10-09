import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'
import Profile from '../pages/Profile'

const router=createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                path:"/",
                element: <Home/>,
            },
            {
                path:"/Me",
                element:<Profile/>
            }
        ],
    },
])
 

export default router;
