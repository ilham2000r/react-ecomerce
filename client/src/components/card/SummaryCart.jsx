import React,{ useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { numberFormat } from '../../util/Number'
const SummaryCart = () => {
    const token = useEcomStore((state)=>state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal]= useState(0)

    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        handleGetUserCart(token)

    },[])

    const handleSaveAddress =() => {
        console.log(address);
        saveAddress(token, address)
        .then((res)=>{
            // console.log(res)
            setAddressSaved(true)
            
        })
        .catch((err)=>{
            console.log('err',err);
            
        })
    }

    const handleGetUserCart = (token) => [
        listUserCart(token)
        .then((res)=>{
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal) 
        })
        .catch((err)=>{
            console.log('err',err);
            
        })
    ]

    const handleGoToPayment = () => {
        if (!addressSaved) {
            return toast.warning('please enter your address')
        }
        navigate('/user/payment')
    }


  return (
    <div className='mx-auto'>
        <div className='flex flex-warp gap-4'>
            {/* left */}
            <div className='w-2/4'>
                <div className='bg-slate-100 p-2 rounded-md border shadow-md space-y-2'>
                    <h1 className='text-lg font-bold'>Address</h1>
                    <textarea 
                        placeholder='Please text your address for delivery'
                        onChange={(e)=>setAddress(e.target.value)}
                        className='w-full px-2 rounded-md' />
                    <button 
                        onClick={handleSaveAddress}
                        className='bg-sky-400 text-white px-4 py-2 rounded-md shadow-md hover:scale-110 duration-200 '>
                        Save Address
                    </button>
                </div>
            </div>
            {/* right */}
            <div className='w-2/4 '>
                <div className='bg-zinc-100 p-2 rounded-md border shadow-md space-y-2'> 
                    <h1 className='text-lg font-bold'>Summary</h1>
                    {/* item list from db */}
                    {
                        products?.map((item,index)=>
                            <div key={index}>
                            {/* Loop this div */}
                            <div className='flex justify-between items-end gap-4 my-5'>
                                <div>
                                    <p><b>Product Name</b></p>
                                    <div className='overflow-y-auto max-h-16 my-2 p-2'>
                                        <p>{item.product.title}</p>
                                    </div>
                                    <p><b>Amount</b> : {item.count} pcs x {numberFormat(item.product.price)} ฿</p>
                                </div>
                                <div>
                                    <p className='text-orange-500'>{numberFormat(item.count*item.product.price)}</p>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    
                    <div>
                        <div className='flex justify-between'>
                            <p>Delivery Cost</p>
                            <p>0.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Discount</p>
                            <p>0.00</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='flex justify-between'>
                            <p className='text-md font-bold'>Net Price</p>
                            <p className='text-md font-bold text-red-500'>{numberFormat(cartTotal)}</p>
                        </div>
                    </div>
                    <div>
                        <button 
                        
                            onClick={handleGoToPayment}
                            // disabled = {!addressSaved}
                            className='w-full py-2 mt-2 bg-green-400 rounded-md shadow-md border hover:scale-105 duration-200'>
                            <p className='font-bold text-white'>Payment</p>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SummaryCart