import React from "react";
import Header from "../../components/Header";
import "./Home.css";
import Card from "../../components/Card";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import ModalCreateOrEditCard from "../../components/Modal/CreateOrEditCard";

const Home = () => {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };
  return (
    <section className="page-home">
      <Header />
      <div className="create-new-card" onClick={openCreateCardModal}>
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
      <ModalCreateOrEditCard
        open={isCreateCardModalOpen}
        onCancel={() => setIsCreateCardModalOpen(false)}
        title="Novo card"
      />
    </section>
  );
};

export default Home;
