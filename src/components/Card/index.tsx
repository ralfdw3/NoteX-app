import "./Card.css";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { ICard } from "../../common/ICard";

const Card = () => {
  const calcDiffDays = (date: string) => {
    const today = new Date();
    const dateCard = new Date(date);
    console.log(dateCard.getDate() - today.getDate() + 1);
    return dateCard.getDate() - today.getDate() + 1;
  };

  const apperrenceDate = "2023-07-26";

  const diffInDays = calcDiffDays(apperrenceDate);

  let gradient;
  if (diffInDays <= -7) {
    gradient = "red-gradient";
  } else if (diffInDays >= 0) {
    gradient = "green-gradient";
  } else {
    gradient = "yellow-gradient";
  }

  return (
    <div className={`card-container ${gradient}`}>
      <div className="card-header">
        <span className="card-apperrence-date">{apperrenceDate}</span>
        <div className="card-icons">
          <AiFillEdit size={25} className="card-icon" />
          <AiFillCloseCircle size={25} className="card-icon" />
        </div>
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
    </div>
  );
};

export default Card;
