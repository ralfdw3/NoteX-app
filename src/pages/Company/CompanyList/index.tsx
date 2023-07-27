import { Pagination } from "antd";
import CompanyItem from "../CompanyItem";
import "./CompanyList.css";

const CompanyList = () => {
  return (
    <div className="company-list">
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <CompanyItem />
      <Pagination defaultCurrent={1} total={15} pageSize={15} />
    </div>
  );
};

export default CompanyList;
