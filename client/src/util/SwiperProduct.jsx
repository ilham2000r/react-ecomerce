import React,{ useState, useEffect, Children } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination,Autoplay,Navigation } from 'swiper/modules';

const SwiperProduct = ({children}) => {
  return (
    <div>
        <Swiper 
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
            centeredSlides={true}
            pagination={true}
            navigation={true} 
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper object-cover rounded-md">
            {children}
      </Swiper>
    </div>
  )
}

export default SwiperProduct