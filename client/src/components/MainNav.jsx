import React,{ useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const MainNav = () => {
    const carts = useEcomStore((state)=>state.carts)
    const user = useEcomStore((state)=>state.user)
    const [isOpen, setIsOpen] = useState(false)
    const logout = useEcomStore((state)=>state.logout)

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
        toast.success('Logout success')
    }
    // console.log(Boolean(user));
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

  return (
    <nav className='bg-zinc-200'>
        <div className='mx-auto px-4'>
            <div className='flex justify-between h-16'>
                <div className='flex items-center gap-4 font-semibold'>
                    <NavLink 
                        to={'/'}>
                        Logo
                    </NavLink>
                    <NavLink 
                        to={'/'}
                        className={({isActive})=>
                            isActive
                            ? "bg-slate-300 py-2 px-3 rounded-full"
                            : "hover:bg-slate-300 duration-300 py-2 px-3 rounded-full"
                        }>
                        Home
                    </NavLink>
                    <NavLink 
                        to={'/shop'}
                        className={({isActive})=>
                            isActive
                            ? "bg-slate-300 py-2 px-3 rounded-full"
                            : "hover:bg-slate-300 duration-300 py-2 px-3 rounded-full"
                        }>
                        Shop
                    </NavLink>
                    <NavLink 
                        to={'/cart'} 
                        className={({isActive})=>
                            isActive
                            ? "bg-slate-300 py-2 px-3 rounded-full relative "
                            : "hover:bg-slate-300 duration-300 py-2 px-3 rounded-full relative "
                        }>
                        Cart
                        {
                            carts.length > 0 
                            && (
                                <span className='absolute top-0 bg-neutral-400 rounded-full px-2'>{carts.length}</span>
                            )
                        }
                        
                    </NavLink>
                
                
                </div>

                {
                    user
                    ? <div className='flex items-center gap-4 font-semibold'>
                    <button 
                        onClick={toggleDropdown}
                        className='flex items-center gap-2 hover:bg-gray-300 rounded-full pr-2'>
                        <img
                            className='w-8' 
                            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-2666380-2217345.png?f=webp&w=256" />
                            <ChevronDown />
                    </button>
                    {
                        isOpen && 
                        <div className='absolute top-14 right-3 bg-white shadow-md z-50'>
                            <Link 
                                to={'/user/history'}
                                className='block px-4 py-2 hover:bg-gray-200 '>
                                History
                            </Link>
                            <button 
                                onClick={(()=>handleLogout())}
                                className='block px-4 py-2 hover:bg-gray-200 '>
                                Logout
                            </button>
                        </div>
                    }
                    
                </div>
                    : <div className='flex items-center gap-4 font-semibold'>
                    <NavLink 
                        to={'/register'}
                        className={({isActive})=>
                            isActive
                            ? "bg-slate-300 py-2 px-3 rounded-full"
                            : "hover:bg-slate-300 duration-300 py-2 px-3 rounded-full"
                        }>
                        Register
                    </NavLink>
                    <NavLink 
                        to={'/login'}
                        className={({isActive})=>
                            isActive
                            ? "bg-slate-300 py-2 px-3 rounded-full"
                            : "hover:bg-slate-300 duration-300 py-2 px-3 rounded-full"
                        }>
                        Login
                        </NavLink>
                </div>
                }
                
                

            </div>
        </div>
    </nav>
  )
}

export default MainNav