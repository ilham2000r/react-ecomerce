import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

const Shop = () => {
  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)
  useEffect(()=>{
    getProduct(10)
  },[])
  return (
    <div className='flex'>
      <div className='w-1/4 p-4 bg-slate-200 h-screen rounded-md'>
        <SearchCard />
      </div>
      <div className='w-1/2 p-4 h-screen rounded-md overflow-y-auto'>
        <p className='text-2xl font-bold mb-4'>
          All Product
        </p>
        <div className='flex flex-wrap gap-2 '>
          {
            products.map((item, index)=>
              <ProductCard key={index} item={item} />
            )
          } 
        </div>
      </div>
      <div className='w-1/4 p-4 bg-zinc-200 h-screen rounded-md overflow-y-auto'>
        <CartCard />
      </div>
    </div>
    
  )
}

export default Shop