import React, { useState, useEffect } from 'react'
import { listAllUser, changeUserStatus,changeUserRole } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUsers = () => {
    const token = useEcomStore((state)=>state.token)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        handleGetUser(token)

    },[])

    const handleGetUser = (token) => {
        listAllUser(token)
        .then((res)=>{
            // console.log(res);
            setUsers(res.data)
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    const handleChangeUserStatus = (userId, userStatus) => {
        // console.log(userId, userStatus);
        const value = {
            id : userId,
            enabled : !userStatus
        }
        changeUserStatus(token, value) 
        .then((res)=>{
            console.log(res);
            handleGetUser(token)
            toast.success('Status updated')
        })
        .catch((err)=>{
            console.log(err);
            
        })
        
    }

    const handleChangeUserRole = (userId, userRole) => {
        // console.log(userId, userStatus);
        const value = {
            id : userId,
            role : userRole
        }
        changeUserRole(token, value) 
        .then((res)=>{
            console.log(res);
            handleGetUser(token)
            toast.success('Role updated')
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }

  return (
    <div className='container mx-auto bg-white shadow-md rounded-md p-5'>
        <div>
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Email</th>
                    {/* <th>Date</th> */}
                    <th>Role</th>
                    <th>Status</th>
                    <th>Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map((user, index)=>(
                        <tr key={index}>
                            <td className='text-center'>{index+1}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.role}</td> */}
                            <td className='text-center'>
                                <select 
                                    onChange={(e)=>handleChangeUserRole(user.id, e.target.value)}
                                    value={user.role}>
                                    <option >admin</option>
                                    <option >user</option>
                                </select>
                            </td>
                            <td className='text-center'>
                                {user.enabled ? 'Active' : 'Inactive'}
                            </td>
                            <td className='text-center'>
                                <button
                                className='py-1 px-2 bg-neutral-500 rounded-full text-white text-sm border-2 border-gray-200 hover:bg-slate-600'
                                    onClick={()=>handleChangeUserStatus(user.id,user.enabled)}>
                                    {user.enabled ? 'Disable' : 'Enable'}
                                </button>
                            </td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default TableUsers