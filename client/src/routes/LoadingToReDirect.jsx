import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToReDirect = () => {
  const [count, setCount] = useState(3)
  const [redirect, setRedicrect] = useState(false)

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((currentCount)=>{
        if(currentCount===1){
          clearInterval(interval)
          setRedicrect(true)
        }
        return currentCount -1
      })
    },1000)
    return ()=> clearInterval(interval)
  },[])
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div>No permission, Redirect in {count}</div>
  )
}

export default LoadingToReDirect