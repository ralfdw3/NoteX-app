import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../components/Card";
import Header from "../../components/Header";
import ModalCreateOrEditCard from "../../components/Modal/CreateOrEditCard";
import "./Home.css";
import dayjs from "dayjs";

const Home: React.FC = () => {
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
        <Card
          cardData={{
            id: 1,
            title: "Título do card 1",
            description: "Descrição do card 1",
            appearance: dayjs("2023-08-10"),
            company: "Empresa do card 1",
            status: "ABERTO",
          }}
        />
        <Card
          cardData={{
            id: 2,
            title: "Título do card 2",
            description: "Descrição do card 2",
            appearance: dayjs("2023-05-10"),
            company: "Empresa do card 2",
            status: "CONCLUIDO",
          }}
        />
        <Card
          cardData={{
            id: 3,
            title: "Título do card 3",
            description: "Descrição do card 3",
            appearance: dayjs("2023-07-29"),
            company: "Empresa do card 3",
            status: "EM NEGOCIAÇÃO",
          }}
        />
      </div>
      <ModalCreateOrEditCard
        open={isCreateCardModalOpen}
        onCancel={() => setIsCreateCardModalOpen(false)}
        headerText="Novo card"
      />
    </section>
  );
};

export default Home;
