// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import logo_1 from "/logo_1.png";
import logo_2 from "/logo_2.jpeg";
import logo_3 from "/logo_3.jpeg";
import logo_4 from "/logo_4.png";
import logo_5 from "/logo_5.png";
import logo_6 from "/logo_6.png";
import { Autoplay } from "swiper/modules";

const Slider = () => {
  const brandLogo = [
    logo_1,
    logo_2,
    logo_3,
    logo_4,
    logo_5,
    logo_6,
    logo_1,
    logo_2,
    logo_3,
    logo_4,
    logo_5,
    logo_6,
  ];

  // I have used some AI-suggested classes here to make the website look more beautiful

  return (
    <div className="my-5">
      <h1 className="font-bold text-4xl text-center mt-3 mb-6">
        Top <span className="text-sky-500">Publisher</span>
      </h1>
      <Swiper
        loop={true}
        slidesPerView={7}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        className="swiper-linear-ticker"
        breakpoints={{
          0: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 7,
          },
        }}
      >
        {brandLogo.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-15 w-15 object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-linear-ticker .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;
