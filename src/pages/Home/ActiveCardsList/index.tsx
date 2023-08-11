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
            status: card.status,
            creation: card.creation,
            company: {
              id: card.company.id,
              code: card.company.code,
              name: card.company.name,
            },
          }}
          getAllActiveCards={getAllActiveCards}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default ActiveCardsList;
