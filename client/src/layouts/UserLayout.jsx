import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

const UserLayout = () => {
  return (
    <div>
        <MainNav />
      <main className='h-full px-4 mt-2 mx-auto'>
        <Outlet />
      </main>
        <Footer />
    </div>
  )
}

export default UserLayout