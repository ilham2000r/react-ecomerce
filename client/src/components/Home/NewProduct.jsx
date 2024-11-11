import React,{ useState, useEffect } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperProduct from '../../util/SwiperProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = () => {
        listProductBy('updatedAt','desc',12)
        .then((res)=>{
            console.log(res.data);
            setData(res.data)
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
  return (
    <div className='my-4 p-4 bg-slate-200 rounded-md shadow-lg'>
        <p className="text-4xl text-center my-4 font-bold">New Product</p>
        <SwiperProduct className='flex flex-wrap gap-4 justify-between'>
            {
                data?.map((data, index)=>(  
                    <SwiperSlide>
                        <ProductCard
                            key={index} 
                            item={data}/>
                    </SwiperSlide>  
                ))
            }
        </SwiperProduct>
        
    </div>
  )
}

export default NewProduct