import { Dayjs } from "dayjs";
import "./CardItem.css";

interface AllCompanyCardsListProps {
  id: string;
  title: string;
  status: string;
  description?: string;
  appearance: Dayjs;
}

const CardItem: React.FC<AllCompanyCardsListProps> = ({
  id,
  title,
  status,
  description,
  appearance,
}) => {
  return (
    <div className="item-card-container">
      <span>
        {id} - {title} - {status} - {description} - {appearance.toString()}
      </span>
    </div>
  );
};
export default CardItem;
