import React from "react";
import Header from "../../components/Header";
import "./Home.css";
import Card from "../../components/Card";
import { AiFillPlusCircle } from "react-icons/ai";

const Home = () => {
  return (
    <section className="page-home">
      <Header />
      <div className="create-new-card">
        <span>Novo card</span>
        <AiFillPlusCircle size={30} className="create-new-card-icon" />
      </div>

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
