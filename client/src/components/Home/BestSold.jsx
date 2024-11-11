import React,{ useState, useEffect } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperProduct from '../../util/SwiperProduct'
import { SwiperSlide } from 'swiper/react'

const BestSold = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = () => {
        listProductBy('sold','desc',12)
        .then((res)=>{
            console.log(res.data);
            setData(res.data)
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
  return (
        <div className='my-4 p-4 bg-zinc-200 rounded-md shadow-lg'>
            <p className="text-4xl text-center my-4 font-bold">Best seller</p>
            <SwiperProduct>
                {
                    data?.map((data, index)=>(    
                        <SwiperSlide key={index} >
                            <ProductCard
                                item={data}/>
                        </SwiperSlide>
                    ))
                }
            </SwiperProduct>
        </div>
  )
}

export default BestSold