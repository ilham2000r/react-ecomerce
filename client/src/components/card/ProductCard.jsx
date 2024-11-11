import React from 'react'
import { ShoppingCart } from 'lucide-react'
import useEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../util/Number'
import { motion } from "framer-motion"

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)
  
  // console.log(item);
  
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    >
    <div className='border rounded-md shadow-lg p-2 w-48 '>
        <div>
          {
            item.images && item.images.length > 0 
            ? <img 
                className='rounded-md object-cover hover:scale-110 duration-300'
                src={item.images[0].url}/>
            : <div 
                className='w-full h-24 bg-gray-200 rounded-md text-center items-center flex justify-center shadow-md'>
                No Image
              </div>
          }
        </div>  
        <div className='py-2'>
          <div className='overflow-y-auto h-24'>
            <p className='text-xl font-bold'>{item.title}</p>
          </div>
            <p className='text-sm text-gray-600 '>
                {item.description}
            </p> 
        </div>
        <div className='flex justify-between items-end'>
            <span className='text-lg font-bold'>{numberFormat(item.price)}฿</span>
            <button 
              onClick={()=>actionAddtoCart(item)}
              className='p-1 rounded-md hover:bg-zinc-300 hover:shadow-2xl duration-200'>
              <ShoppingCart />
            </button>
        </div>  
    </div>
    </motion.div>
  )
}

export default ProductCard