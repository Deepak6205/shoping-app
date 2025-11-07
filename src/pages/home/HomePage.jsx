import React from "react";
import Layout from "../../components/lalyout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
    </Layout>
  );
};

export default HomePage;
