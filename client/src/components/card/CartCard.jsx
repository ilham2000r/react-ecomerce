import React from 'react'
import { Trash2 } from 'lucide-react';
import useEcomStore from '../../store/ecom-store'
import { Link } from "react-router-dom"
import { numberFormat } from '../../util/Number';


const CartCard = () => {
    const carts = useEcomStore((state)=>state.carts)
    const actionUpdateQuantity = useEcomStore((state)=>state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state)=>state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)
    console.log(carts);
    
  return (
    <div>
        <h1 className='text23xl font-bold'>Shopping Cart</h1>
        <div className='border p-2'>
            {
                carts.map((item,index)=>
            <div key={index} className='bg-white p-2 shadow-md rounded-md my-2'>
                <div className='flex justify-between'>
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
                            <p className='text-sm'>{ item.description }</p>
                        </div>
                    </div>
                    <div 
                        onClick={()=>actionRemoveProduct(item.id)}
                        className='m-2 text-red-500 hover:cursor-pointer'>
                        {/* Right */}
                        <Trash2 />
                    </div>
                </div>
                <div>
                    {/* Row 1 */}
                    <div className='flex justify-between'>
                        <div className='rounded-sm pr-2 py-2'>
                            {/* left */}
                            <button 
                                onClick={()=>actionUpdateQuantity(item.id, item.count-1)}
                                className='w-6 h-6 mr-2 bg-slate-300 rounded-sm hover:bg-zinc-500' >
                                -
                            </button>
                            <span>{ item.count }</span>
                            <button 
                                onClick={()=>actionUpdateQuantity(item.id, item.count+1)}
                                className='w-6 h-6 ml-2 bg-slate-300 rounded-sm hover:bg-zinc-500' >
                                +
                            </button>
                        </div>
                        <div className='font-bold text-blue-500'>
                            {/* right */}
                            { numberFormat((item.price)*(item.count)) } 
                        </div>
                    </div>
                </div>
            </div>
             )
            }
            <div className='flex justify-between px-2 pt-2'>
                <p className='font-bold'>Total</p>
                <p className='font-bold'>{getTotalPrice()}</p>
            </div>
            <Link to={"/cart"}>
                <button 
                    disabled={carts < 1}
                    className='disabled:bg-slate-500 mt-2 bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-700'>
                    Payment
                </button>
            </Link>
        </div>
    </div>
  )
}

export default CartCard