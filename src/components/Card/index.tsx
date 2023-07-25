import "./Card.css";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { ICard } from "../../common/ICard";

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-icons">
        <AiFillEdit size={25} className="card-icon" />
        <AiFillCloseCircle size={25} className="card-icon" />
      </div>
      <span className="card-title">Titulo do card</span>
      <span className="card-company-name">Nome da empresa</span>
      <textarea className="card-description" spellCheck="false">
        descricao grande ou nao
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      </textarea>
    </div>
  );
};

export default Card;
