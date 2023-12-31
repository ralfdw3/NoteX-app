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
          key={company.id}
          companyData={company}
          getAllActiveCompanies={getAllActiveCompanies}
        />
      ))}
    </div>
  );
};

export default CompanyList;
