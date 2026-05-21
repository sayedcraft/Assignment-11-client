// import React from "react";
import banner_1 from '/banner_1.jpeg'
import banner_2 from '/banner_2.jpeg'
import banner_3 from '/banner_3.jpeg'

const Banner = () => {
  return (
    <div>
      <div className="carousel w-full h-112 relative overflow-hidden ">
        <div id="slide1" className="carousel-item relative w-full h-full">
          <img
            src={banner_1}
            className="w-full h-full object-cover"
            alt="Banner 1"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
            <button className="btn btn-primary btn-wide shadow-lg hover:scale-105 transition-transform">
              Read More
            </button>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-10">
            <a
              href="#slide3"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full h-full">
          <img
            src={banner_2}
            className="w-full h-full object-cover"
            alt="Banner 2"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
            <button className="btn btn-secondary btn-outline btn-wide backdrop-blur-sm">
              See Offer
            </button>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-10">
            <a
              href="#slide1"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full h-full">
          <img
            src={banner_3}
            className="w-full h-full object-cover"
            alt="Banner 3"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
            <button className="btn btn-accent text-white shadow-md">
             Sign Up
            </button>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between z-10">
            <a
              href="#slide2"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-black"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
