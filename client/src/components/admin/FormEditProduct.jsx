import React, { useState,useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { readProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const initialState = {
    title : "",
    description : "",
    price : 0,
    quantity : 0,
    categoryId : '',
    images : []
}

const FormEditProduct = () => {
    const token = useEcomStore((state)=>state.token)
    const getCategory = useEcomStore((state)=>state.getCategory)
    const categories = useEcomStore((state)=>state.categories)
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log(products);

    const [form,setForm] = useState(initialState)

    useEffect(()=>{
        getCategory()
        fetchProduct(token, id, form)
    },[])

    const fetchProduct = async(token,id,form)=>{
        try {
            const res = await readProduct(token,id,form)
            console.log(res);
            setForm(...res.data)
        } catch (err) {
            console.log('Error fetch data',err);
            
        }
    }

    
    const handleOnchange = (e) =>{
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
                const res = await updateProduct(token, id, form)
                toast.success(`Edit ${res.data.title} success`)
                navigate('/admin/product')
                console.log(res)
        } catch (err) {
            console.log(err)
            
        }
        // console.log(form)
        
    }


  return (
    <div className='container mx-auto bg-white shadow-md rounded-md p-5'>
        <form onSubmit={handleSubmit}>
            <h1 className='mb-5 font-bold text-xl'>Product Detail</h1>
            <div>
                <p>Product Name</p>
                <input 
                    onChange={handleOnchange}
                    placeholder='Title'
                    name='title'
                    className='border mb-4 mx-5 mt-2 rounded-md'
                    type="text"
                    value={form.title} />
            </div>
            <div>
                <p>Description</p>
                <input 
                    onChange={handleOnchange}
                    placeholder='Description'
                    name='description'
                    className='border mb-4 mx-5 mt-2 rounded-md'
                    type="text"
                    value={form.description} />
            </div>
            <div>
                <p>Price</p>
                <input 
                    onChange={handleOnchange}
                    placeholder='Price'
                    name='price'
                    className='border mb-4 mx-5 mt-2 rounded-md'
                    type="number"
                    value={form.price === null ? "" : form.price} />
            </div>
            <div>
                <p>Quantity</p>
                <input 
                    onChange={handleOnchange}
                    placeholder='Quantity'
                    name='quantity'
                    className='border mb-4 mx-5 mt-2 rounded-md'
                    type="number"
                    value={form.quantity === null ? "" : form.quantity} />
            </div>
            <div>
                <p>Category</p>
                <select 
                    className='border mx-5 mt-2 rounded-md'
                    name='categoryId' 
                    onChange={handleOnchange}
                    value={form.categoryId === null ? "" : form.categoryId }>
                        <option value="" disabled >Please Select</option>
                        
                    {
                        categories.map((item, index)=>
                            <option key={index} value={item.id}>{ item.name }</option>
                        )
                    }
            </select>
            </div>
            <hr />
            <UploadFile form={form} setForm={setForm} />
            <div className='flex gap-5 mt-5'>
                <button 
                    className='px-4 py-4 my-2 bg-sky-400 text-black font-semibold rounded-lg hover:cursor-pointer hover:bg-sky-600 hover:text-white duration-300'>
                    Edit Product
                </button>
                <button className='px-4 py-4 my-2 bg-slate-400 text-black font-semibold rounded-lg hover:cursor-pointer hover:bg-slate-600 hover:text-white duration-300'>
                    <Link to={'/admin/product/'}>Back to product</Link>
                </button>
            </div>
        </form>
    </div>
  )
}

export default FormEditProduct