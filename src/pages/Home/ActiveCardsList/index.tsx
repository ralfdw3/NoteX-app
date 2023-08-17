import { ICard } from "../../../common/interfaces/ICard";
import Card from "../Card";
import "./ActiveCardsList.css";

interface ActiveCardsListProps {
  allActiveCards: ICard[];
  getAllActiveCards: () => void;
}

const ActiveCardsList = ({
  allActiveCards,
  getAllActiveCards,
}: ActiveCardsListProps) => {
  return (
    <div className="active-cards-container">
      {allActiveCards.map((card) => (
        <Card
          cardData={card}
          getAllActiveCards={getAllActiveCards}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default ActiveCardsList;
