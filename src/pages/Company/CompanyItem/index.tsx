import EditAndExcludeIcons from "../../../components/EditAndExcludeIcons";
import { AiFillDownCircle } from "react-icons/ai";
import "./CompanyItem.css";

const CompanyItem = () => {
  return (
    <div className="company-items">
      <span>nome da empresa</span>
      <div className="company-icons">
        <AiFillDownCircle size={25} className="company-cards-icon" />
        <EditAndExcludeIcons />
      </div>
    </div>
  );
};

export default CompanyItem;
