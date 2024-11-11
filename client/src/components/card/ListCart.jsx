import React from 'react'
import { ListCheck } from 'lucide-react'
import useEcomStore from '../../store/ecom-store'
import { Link,useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user'
import { toast } from 'react-toastify'
import { numberFormat } from '../../util/Number'

const ListCart = () => {
    const navigate = useNavigate()

    const cart = useEcomStore((state)=>state.carts)
    const users = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)

    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)

    const handleSaveCart = async()=> {
        await createUserCart(token,{cart})
        .then((res)=>{
            console.log(res)
            toast.success('Add to Cart Success')
            navigate('/checkout')
        })
        .catch((err)=>{
            console.log('err',err)
            toast.warning(err.response.data.message)
        })
    }
    
    
  return (
    <div className='bg-gray-200 rounded-md p-4'>
        <div>
            <div className='flex gap-4'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold'>Product List {cart.length} Pcs. </p>
            </div>
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* left */}
                <div className='col-span-2'>
                    {
                        cart.map((item,index)=>
                        <div key={index} className='bg-white p-2 shadow-md rounded-md my-2'>
                            <div className='flex justify-between mb-2'>
                                {/* Row 1 */}
                                <div className='flex gap-2 items-center'>
                                    {/* Left */}
                                    {
                                        item.images && item.images.length > 0 
                                        ? <img 
                                            className='w-16 h-16 rounded-md '
                                            src={item.images[0].url}/>
                                        :  <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'> No Image </div>
                                    }
                                    <div className='overflow-y-auto max-h-24'>
                                        <p className='font-bold'>{ item.title }</p>
                                        <p className='text-sm'> {numberFormat(item.price)} x {item.count} </p>
                                    </div>
                                </div>
                                <div className='font-bold text-blue-500'>
                                    {/* right */}
                                    { numberFormat((item.price)*(item.count)) } 
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
                {/* right */}
                <div className='bg-white p-2 rounded-md shadow-md space-y-4 '>
                    <p className='text-xl font-bold'>Total Price</p>
                    <div className='flex justify-between'>
                        <span>Net Price</span>
                        <span className='text-lg font-bold'>฿ {numberFormat(getTotalPrice())}</span>
                    </div>
                    {
                        users
                        ? (<Link>
                            <button 
                            disabled={cart.length < 1}
                                onClick={handleSaveCart}
                                className='disabled:bg-gray-600 bg-green-600 w-full rounded-md text-white py-2 my-2 shadow-md hover:bg-green-700'>
                                Order
                            </button>
                        </Link>
                        ) : (<Link to={'/login'}>
                            <button className='bg-orange-600 w-full rounded-md text-white py-2 my-2 shadow-md hover:bg-green-700'>
                                Login to Order
                            </button>
                        </Link>)
                    }
                    <Link to={'/shop'}>
                        <button className='bg-sky-600 w-full rounded-md text-white py-2 my-2 shadow-md hover:bg-gray-700'>
                            Edit Product list
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListCart