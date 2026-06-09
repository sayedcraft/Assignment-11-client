// import React from 'react';
import Banner from "../Components/Banner";
import Blog from "../Components/Blog";
import Coverage from "../Components/Coverage";
import FAQ from "../Components/FAQ";
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
        <Blog></Blog>
        <Slider></Slider>
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
