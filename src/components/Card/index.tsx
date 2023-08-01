import "./Card.css";
import EditAndExcludeIcons from "../EditAndExcludeIcons";
import { useState } from "react";
import ModalCreateOrEditCard from "../Modal/CreateOrEditCard";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ICard } from "../../common/interfaces/ICard";
import dayjs from "dayjs";

interface ICardProps {
  cardData: ICard;
}

const Card: React.FC<ICardProps> = ({ cardData }) => {
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

  const diffInDays = cardData.appearance.diff(dayjs(), "day");

  let gradient;
  if (diffInDays < -7) {
    gradient = "red-gradient";
  } else if (diffInDays >= 0) {
    gradient = "green-gradient";
  } else {
    gradient = "yellow-gradient";
  }

  return (
    <div className={`card-container ${gradient}`}>
      <div className="card-header">
        <span className="card-apperrence-date">
          {cardData.appearance.format("DD/MM/YYYY")}
        </span>
        <span className="card-status">{cardData.status}</span>
        <EditAndExcludeIcons
          editModal={openEditModal}
          excludeModal={excludeModal}
        />
        {contextHolder}
      </div>

      <span className="card-title">{cardData.title}</span>
      <span className="card-company-name">{cardData.company}</span>
      <textarea
        className="card-description"
        spellCheck="false"
        defaultValue={cardData.description}
        disabled={true}
      />
      <ModalCreateOrEditCard
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        headerText="Editar card"
        cardData={cardData}
      />
    </div>
  );
};

export default Card;
