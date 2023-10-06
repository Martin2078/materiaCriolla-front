import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'

const router=createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                path:"/",
                element: <Home/>,
            },
        ],
    },
])
 

export default router;
