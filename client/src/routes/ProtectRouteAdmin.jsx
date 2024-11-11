import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToReDirect from './LoadingToReDirect'

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state=> state.user))
    const token = useEcomStore((state=> state.token))
    
    useEffect(()=>{
        if(user && token){
            currentAdmin(token)
            .then((res)=>setOk(true))
            .catch((err)=>setOk(false)) 
        }
    },[])
    
  return ( 
    ok ? element : <LoadingToReDirect />
  )
}

export default ProtectRouteAdmin