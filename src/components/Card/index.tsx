import "./Card.css";
import EditAndExcludeIcons from "../EditAndExcludeIcons";
import { useState } from "react";
import ModalCreateOrEditCard from "../Modal/CreateOrEditCard";
import ModalExcludeCard from "../Modal/ExcludeCard";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

interface ICard {
  title: string;
  description?: string;
  appearance: Date;
  company: string;
}

const Card = () => {
  const calcDiffDays = (date: string) => {
    const today = new Date();
    const dateCard = new Date(date);
    console.log(dateCard.getDate() - today.getDate() + 1);
    return dateCard.getDate() - today.getDate() + 1;
  };

  const apperrenceDate = "2023-07-10";

  const diffInDays = calcDiffDays(apperrenceDate);

  let gradient;
  if (diffInDays <= -7) {
    gradient = "red-gradient";
  } else if (diffInDays >= 0) {
    gradient = "green-gradient";
  } else {
    gradient = "yellow-gradient";
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const [modal, contextHolder] = Modal.useModal();
  const excludeModal = () => {
    modal.confirm({
      title: "Confirmar",
      icon: <ExclamationCircleOutlined />,
      content: "Você tem certeza que deseja excluir o card?",
      okText: "Sim",
      cancelText: "Cancelar",
    });
  };

  return (
    <div className={`card-container ${gradient}`}>
      <div className="card-header">
        <span className="card-apperrence-date">{apperrenceDate}</span>
        <EditAndExcludeIcons
          editModal={openEditModal}
          excludeModal={excludeModal}
        />
        {contextHolder}
      </div>
      <span className="card-title">Titulo do card</span>
      <span className="card-company-name">Nome da empresa</span>
      <textarea
        className="card-description"
        spellCheck="false"
        defaultValue={`descricao grande ou nao aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        `}
        disabled={true}
      />
      <ModalCreateOrEditCard
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        title="Editar card"
      />
    </div>
  );
};

export default Card;
