import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import CheckOut from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import HomeUser from '../pages/user/HomeUser'
import UserLayout from '../layouts/UserLayout'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import EditProduct from '../components/admin/EditProduct'
import Payment from '../pages/user/Payment'
import ManageOrder from '../pages/admin/ManageOrder'

const router = createBrowserRouter([
    { 
        path:'/', 
        element:<Layout />,
        children:[
            { index: true, element:<Home />},
            { path:'shop', element:<Shop />},
            { path:'cart', element:<Cart />},
            { path:'checkout', element:<CheckOut />},
            { path:'login', element:<Login />},
            { path:'register', element:<Register />}
        ]
    },
    {
        path:'/admin',
        // element:<AdminLayout />,
        element:<ProtectRouteAdmin element={<AdminLayout />} />,
        children:[
            { index: true, element:<Dashboard />},
            { path: 'category', element:<Category />},
            { path: 'product', element:<Product />},
            { path: 'product/:id', element:<EditProduct />},
            { path: 'manage', element:<Manage />},
            { path: 'orders', element:<ManageOrder />}
        ]
    },
    {
        path:'/user',
        // element:<UserLayout />,
        element:<ProtectRouteUser element={<UserLayout />} />,
        children:[
            { index: true, element:<HomeUser />},
            { path: 'payment', element:<Payment />},
            { path: 'history', element:<History />}
        ]
    }
])

const AppRoute = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default AppRoute