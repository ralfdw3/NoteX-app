import dayjs from "dayjs";
import "./CardItem.css";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import { ICard } from "../../../../common/interfaces/ICard";
import ModalEditCard from "../../EditCard";

interface AllCompanyCardsListProps {
  card: ICard;
}

const CardItem: React.FC<AllCompanyCardsListProps> = ({ card }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="item-card-container">
      <span className="item-card-container-status">{card.status}</span>
      <span className="item-card-container-title">{card.company.name}</span>
      <span className="item-card-container-creation">
        {dayjs(card.creation).format("DD/MM/YYYY")}
      </span>
      <IoMdMore
        className="item-card-container-icon"
        size={25}
        onClick={() => setIsEditModalOpen(true)}
      />
      <ModalEditCard
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        cardData={card}
      />
    </div>
  );
};
export default CardItem;
