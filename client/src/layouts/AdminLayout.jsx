import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'

const AdminLayout = () => {
  return (
    <div className='flex'>
      <div className='h-screen '>
        <AdminSidebar />
      </div>
      <div className='flex-1 flex-col p-5 overflow-y-auto h-screen'>
        <AdminHeader />
        <main className='flex-1 p-6 bg-zinc-200 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout