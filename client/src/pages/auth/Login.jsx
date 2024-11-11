import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-store'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const actionLogin = useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
  console.log('user form zustand',user);
  
  const [form, setForm] = useState({
    email:"",
    password:""
  })
  
  const handleOnchange = (e)=> {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e)=> {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome Back')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if(role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1) // มาจากทางไหน ไปที่ทางนั้น
    }
  }

  return (
    <div className="mt-20 flex justify-center">
      <div className="w-5/6 shadow-md rounded-md lg:w-1/2 p-10 bg-neutral-300 flex flex-col justify-center items-center ">
        <p className='text-3xl font-bold'>Login</p>
        <form 
          className="w-full lg:w-1/2"
          onSubmit={handleSubmit}>
          <p>Email</p>
          <input 
            className='border w-full'
            onChange={handleOnchange}
            type="email"
            name='email' 
          />
          <p>Password</p>
          <input
            className='border w-full' 
            onChange={handleOnchange}
            type="text" 
            name='password'
          />
          <div className='flex flex-col justify-center mt-4 gap-4'>
            <button className='btn btn-neutral w-full'>Login</button>
            <p>Don't have account. 
              <Link 
                className='hover:text-sky-700'
                to={'/register'}> let's register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login