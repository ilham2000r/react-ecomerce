import React,{ useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination,Autoplay,Navigation } from 'swiper/modules';

const ContentCarousel = () => {

    const [data, setData] = useState([])

    useEffect(()=> {
        handleGetImg()
    },[])

    const handleGetImg = ()=>{
        axios.get('https://picsum.photos/v2/list?page=1&limit=15')
        .then((res)=>{
            // console.log(res);
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }   

  return (
    <div>
        <Swiper 
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            centeredSlides={true}
            pagination={{
                clickable: true,
              }}
            navigation={true} 
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper w-full lg:h-96 rounded-md">
        {
            data?.map((data, index)=>(
                <SwiperSlide key={index}>
                    <img src={data.download_url} />
                </SwiperSlide>
            )
            )
        }
      </Swiper>
    </div>
  )
}

export default ContentCarousel