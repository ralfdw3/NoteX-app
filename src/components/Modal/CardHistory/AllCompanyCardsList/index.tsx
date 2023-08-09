import { ICard } from "../../../../common/interfaces/ICard";
import CardItem from "../CardItem";
import "./AllCompanyCardsList.css";

interface ActiveCompaniesListProps {
  allCompanyCards: ICard[];
}

const AllCompanyCardsList = ({ allCompanyCards }: ActiveCompaniesListProps) => {
  return (
    <div className="all-company-cards-list">
      {allCompanyCards.map((card) => (
        <CardItem
          id={card.id}
          status={card.status}
          appearance={card.appearance}
          title={card.title}
          description={card.description}
          key={card.id}
        />
      ))}
    </div>
  );
};

export default AllCompanyCardsList;
