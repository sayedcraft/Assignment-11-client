// import React from 'react';
import Banner from "../Components/Banner";
import Coverage from "../Components/Coverage";
import LatestBook from "../Components/LatestBook";
import Slider from "../Components/Slider";
import WhyChoose from "../Components/WhyChoose";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-11/12 mx-auto">
        <LatestBook></LatestBook>
        <Coverage></Coverage>
        <WhyChoose></WhyChoose>
        <Slider></Slider>
      </div>
    </div>
  );
};

export default Home;
