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
        <CardItem card={card} />
      ))}
    </div>
  );
};

export default AllCompanyCardsList;
