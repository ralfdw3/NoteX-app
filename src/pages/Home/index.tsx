import { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Header from "../../components/Header";
import ModalCreateCard from "../../components/Modal/CreateCard";
import "./Home.css";
import ActiveCardsList from "./ActiveCardsList";

const Home: React.FC = () => {
  const [allActiveCards, setAllActiveCards] = useState([]);

  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const getAllActiveCards = () => {
    fetch("http://localhost:8080/v1/card/all/active", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        response.json().then((data) => {
          setAllActiveCards(data);
        })
      )
      .catch((error) => {
        alert("Erro ao buscar cards ativos. " + error);
      });
  };

  useEffect(() => {
    getAllActiveCards();
  }, []);

  useEffect(() => {
    getAllActiveCards();
  }, [isCreateCardModalOpen]);

  return (
    <section className="page-home">
      <Header />
      <div className="create-new-card" onClick={openCreateCardModal}>
        <span>Novo card</span>
        <AiFillPlusCircle size={30} className="create-new-card-icon" />
      </div>

      <div className="home-cards cards-container">
        <ActiveCardsList
          allActiveCards={allActiveCards}
          getAllActiveCards={getAllActiveCards}
        />
      </div>
      <ModalCreateCard
        open={isCreateCardModalOpen}
        onCancel={() => setIsCreateCardModalOpen(false)}
      />
    </section>
  );
};

export default Home;
