import CompanyItem from "../CompanyItem";
import "./CompanyList.css";
import { ICompany } from "../../../common/interfaces/ICompany";

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
          companyData={{
            name: company.name,
            code: company.code,
          }}
          key={company.code}
          getAllActiveCompanies={getAllActiveCompanies}
        />
      ))}
    </div>
  );
};

export default CompanyList;
