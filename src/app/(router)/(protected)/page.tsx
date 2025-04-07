"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Maxwidth from '@/widgets/max-width'

const slides = [
  {
    title: "Касби Интихоб кардаи ту ояндаи ту мебошад!",
    bg: "https://st4.depositphotos.com/12982378/25823/i/450/depositphotos_258235018-stock-photo-selective-focus-happy-students-graduation.jpg"
  },
  {
    title: "Ҳар касб, агар бо ишқ ва мӯҳаббат иҷро шавад, роҳи беназир ба ояндаро мекушояд!",
    bg: "https://khovar.tj/wp-content/uploads/2016/08/Kitobhonai-milli......jpg"
  },
  {
    title: "Як қадам ба сӯи касби маҳорати хеш, ҳазор қадам ба сӯи муваффақият аст!",
    bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnAa1SJxDBY0ZJwJFdI5rgK3Y7R7PG87CO_w&s"
  },
  {
    title: "Меҳнат манбаи асосии муваффақият аст!",
    bg: "https://avkd.tj/images/OBSHI/153.jpg"
  },
  {
    title: "Ояндаи шумо бо интихоби дурусти касб оғоз мешавад",
    bg: "https://zarowadk.ru/wp-content/uploads/2013/11/kitob.jpg"
  }
]

export default function SwiperSlider() {
  return (
    <div className="w-[98%] max-w-[1300px] h-[400px] mx-auto my-10 relative">
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full"
          >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                <img
                  src={slide.bg}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                  />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40" />

                {/* Text */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                  <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Styling navigation arrows */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            font-size: 22px;
            }
        `}</style>
      </div>
    </div>
  )
}
