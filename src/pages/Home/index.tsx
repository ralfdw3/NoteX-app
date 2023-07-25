import React from "react";
import Header from "../../components/Header";
import "./Home.css";
import DateSelector from "../../components/DateSelector";
import Card from "../../components/Card";

const Home = () => {
  return (
    <section className="page-home">
      <Header />
      <DateSelector />
      <div className="home-cards cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Home;
