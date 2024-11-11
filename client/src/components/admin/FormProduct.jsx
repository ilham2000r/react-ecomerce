import React, { useState,useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { Link } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { numberFormat } from '../../util/Number'
import { dateFormat } from '../../util/DateFormat'

const initialState = {
    title : "",
    description : "",
    price : null,
    quantity : null,
    categoryId : '',
    images : []
}

const FormProduct = () => {
    const token = useEcomStore((state)=>state.token)
    const getCategory = useEcomStore((state)=>state.getCategory)
    const categories = useEcomStore((state)=>state.categories)
    const getProduct = useEcomStore((state)=>state.getProduct)
    const products = useEcomStore((state)=>state.products)
    // console.log(products);
    

    const [form,setForm] = useState({
        title : "",
        description : "",
        price : 0,
        quantity : 0,
        categoryId : '',
        images : []
    })

    useEffect(()=>{
        getCategory()
        getProduct(100)
    },[])
    
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
                const res = await createProduct(token, form)
                setForm(initialState)
                getProduct()
                toast.success(`Add ${res.data.title} success`)
                console.log(res)
        } catch (err) {
            console.log(err)
            
        }
        // console.log(form)
        
    }

    const isFormValid = () => {
        return form.title && form.description && form.price > 0 && form.quantity > 0 && form.categoryId;
        // && form.categoryId
    }

    const handleClear = () => {
        setForm(initialState)
        window.location.reload()
        
    }

    const handleDelete = async (id) => {
        if(window.confirm('Confirm to delete product '))  {
            try {
                const res = await deleteProduct(token, id)
                getProduct()
                toast.success(`Delete ${res.data.title} success`)
                console.log(res);
                
            } catch (err) {
                console.log(err);   
            }
        }
        
    }

  return (
    <div className='container mx-auto bg-white shadow-md rounded-md p-5'>
        <form
            onSubmit={handleSubmit}>
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
            
            <hr className='mt-5'/>
            <UploadFile form={form} setForm={setForm} />
            <div className='flex gap-3 my-2'>
                <button 
                    className='px-4 py-4 my-2 bg-sky-400 font-semibold text-black rounded-lg hover:cursor-pointer hover:bg-sky-600 duration-300'
                    disabled={!isFormValid()}>
                    Add Product
                </button>
                <button 
                    className='px-4 py-4 my-2 bg-orange-300 font-semibold text-black rounded-lg hover:cursor-pointer hover:bg-orange-500 duration-300'
                    onClick={handleClear}>
                    Clear
                </button>
            </div>
            <hr />
            <div className='mt-10 overflow-y-auto max-h-96'>
                <table className="table ">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <td scope="col">Image</td>
                        <td scope="col">Product name</td>
                        <td scope="col">Description</td>
                        <td scope="col">Price</td>
                        <td scope="col">Quantity</td>
                        <td scope="col">Sold</td>
                        <td scope="col">Updated At</td>
                        <td scope="col">Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            {
                                                item.images.length > 0 
                                                ? <img
                                                    className='w-24 h-24 rounded-md shadow' 
                                                    src={ item.images[0].url} />
                                                : <div className='bg-zinc-400 py-8 rounded-md text-center font-bold'>
                                                    No Image
                                                </div>
                                            }
                                        </td>
                                        <td >{item.title}</td>
                                        <td >{item.description}</td>
                                        <td >{numberFormat(item.price)}</td>
                                        <td >{item.quantity}</td>
                                        <td >{item.sold}</td>
                                        <td >{dateFormat(item.updatedAt)}</td>
                                        <td >
                                            <div className='flex gap-2 items-center justify-center h-full'>
                                                <div className='hover:cursor-pointer p-1 rounded-md hover:bg-zinc-400 duration-300'>
                                                    <Link to={'/admin/product/' + item.id}>
                                                        <SquarePen />
                                                    </Link>
                                                </div>
                                                <div 
                                                    onClick={()=>handleDelete(item.id)}
                                                    className='hover:cursor-pointer p-1 rounded-md hover:bg-zinc-400 duration-300'>
                                                    <Trash />
                                                </div>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </form>
    </div>
  )
}

export default FormProduct