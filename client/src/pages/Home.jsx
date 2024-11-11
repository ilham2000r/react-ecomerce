import React from "react";
import ContentCarousel from "../components/Home/ContentCarousel";
import BestSold from "../components/Home/BestSold";
import NewProduct from "../components/Home/NewProduct";

const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <BestSold />
      <NewProduct />
    </div>
  )
}

export default Home;
