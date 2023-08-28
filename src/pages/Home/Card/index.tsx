import "./Card.css";
import EditAndExcludeIcons from "../../../components/EditAndExcludeIcons";
import { useState, useEffect } from "react";
import ModalCreateCard from "../../../components/Modal/CreateCard";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ICard } from "../../../common/interfaces/ICard";
import dayjs from "dayjs";
import ModalEditCard from "../../../components/Modal/EditCard";

interface ICardProps {
  cardData: ICard;
  getAllActiveCards: () => void;
}

const Card: React.FC<ICardProps> = ({ cardData, getAllActiveCards }) => {
  const handleDeleteCard = () => {
    fetch(`http://localhost:8080/v1/card?id=${cardData.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAllActiveCards();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      onOk: handleDeleteCard,
    });
  };

  const diffInDays = dayjs(cardData.appearance).diff(dayjs(), "day");

  let gradient;
  if (diffInDays < -7) {
    gradient = "red-gradient";
  } else if (diffInDays >= 0) {
    gradient = "green-gradient";
  } else {
    gradient = "yellow-gradient";
  }

  useEffect(() => {
    getAllActiveCards();
  }, [isEditModalOpen]);

  return (
    <div className={`card-container ${gradient}`}>
      <div className="card-header">
        <span className="card-apperrence-date">
          {dayjs(cardData.appearance).format("DD/MM/YYYY")}
        </span>
        <span className="card-status">{cardData.status}</span>
        <EditAndExcludeIcons
          editModal={openEditModal}
          excludeModal={excludeModal}
        />
      </div>
      {contextHolder}
      <span className="card-company-name">
        {cardData.company.code} - {cardData.company.name}
      </span>
      <textarea
        className="card-description"
        spellCheck="false"
        value={cardData.description}
        disabled={true}
      />
      <ModalEditCard
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        cardData={cardData}
      />
    </div>
  );
};

export default Card;
