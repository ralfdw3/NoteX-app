import "./CompanyList.css";
import { ICompany } from "../../common/interfaces/ICompany";
import CompanyItem from "../CompanyItem";

interface ActiveCompaniesListProps {
  allActiveCompanies: ICompany[];
  getAllActiveCompanies: () => void;
}

const CompanyList = ({
  allActiveCompanies,
  getAllActiveCompanies,
}: ActiveCompaniesListProps) => {
  return (
    <div className="company-list">
      {allActiveCompanies.map((company) => (
        <CompanyItem
          companyData={company}
          key={company.id}
          getAllActiveCompanies={getAllActiveCompanies}
        />
      ))}
    </div>
  );
};

export default CompanyList;
