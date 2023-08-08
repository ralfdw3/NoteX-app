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
          cardData={{
            id: card.id,
            title: card.title,
            description: card.description,
            appearance: card.appearance,
            company: {
              code: card.company.code,
              name: card.company.name,
            },
            status: card.status,
          }}
          getAllActiveCards={getAllActiveCards}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default ActiveCardsList;
