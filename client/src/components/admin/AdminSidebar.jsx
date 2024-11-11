import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'

const AdminSidebar = () => {
  return (
    <div className='bg-gray-300 w-64 flex flex-col h-screen'>
        <div className='h-24 bg-gray-500 flex items-center justify-center text-2xl font-bold text-white'>
            Admin Panel
        </div>
        <nav className='flex-1 px-4 py-4 space-y-2'>
            <NavLink 
                to={'/admin'} 
                end
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
                <LayoutDashboard className='mr-2' />
                Dashboard
            </NavLink>
            <NavLink 
                to={'manage'} 
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
                <LayoutDashboard className='mr-2' />
                Manage
            </NavLink>
            <NavLink 
                to={'category'} 
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
                <LayoutDashboard className='mr-2' />
                Category
            </NavLink>
            <NavLink 
                to={'product'} 
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
                <LayoutDashboard className='mr-2' />
                Product
            </NavLink>
            <NavLink 
                to={'orders'} 
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
                <LayoutDashboard className='mr-2' />
                Order
            </NavLink>
            <NavLink 
                to={'order'} 
                className={({ isActive })=>
                isActive 
                ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md' 
                : 'text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white rounded-md flex items-center'
            }
            >
            </NavLink>
        </nav>
        
        <div className='my-2 mx-4 text-gray-900 hover:bg-gray-900 hover:text-white flex items-center px-4 py-2 rounded-md'>
            <LayoutDashboard className='mr-2' />
            Logut
        </div>
        
    </div>
  )
}

export default AdminSidebar