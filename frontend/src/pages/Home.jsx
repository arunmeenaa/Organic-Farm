import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </>
  );
};

export default Home;
