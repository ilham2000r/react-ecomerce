import React, { useState, useEffect} from 'react'
import { createCategory, removeCategory, listCategory } from '../../api/category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'


const FormCategory = () => {
    const token = useEcomStore((state)=>state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)

    useEffect(()=>{
        getCategory(token)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token,{name})
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success `)
            getCategory(token)
        } catch (err) {
            console.log(err);
            
        }
    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const res = await removeCategory(token, id)
            console.log(res);
            toast.success(`Delete ${res.data.name} success`)
            getCategory(token)
        } catch (err) {
            console.log(err);
        }
        
    }
  return (
    <div className='container mx-auto bg-white shadow-md rounded-md p-5'>
        <h1 className='font-bold text-xl'>Category Management</h1>
        <form className='flex flex-col py-4' onSubmit={handleSubmit}>
            <input 
            onChange={(e)=>setName(e.target.value)}
                className='border mb-4'
                placeholder='Text your new category name'
                type="text" />
                <button 
                    className='btn btn-neutral'>
                    Add Category
                </button>
        </form>
        <hr />
        <ul className='list-none'>
            {
                categories.map((item, index)=>
                    <li 
                        className='flex justify-between hover:bg-slate-300 rounded-md p-2'
                        key={index}>
                        <span>
                            {item.name}
                        </span>
                        <button 
                            onClick={()=>handleDelete(item.id)}
                            className='btn btn-warning m-1 p-1'>
                            Delete
                            </button>
                    </li>
                )
            }
            
        </ul>
    </div>
  )
}

export default FormCategory