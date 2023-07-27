import Header from "../../components/Header";
import "./Company.css";
import { Input } from "antd";
import CompanyList from "./CompanyList";
const Company = () => {
  return (
    <section>
      <Header />
      <Input.Search
        className="search-input"
        placeholder="Digite aqui..."
        onSearch={(value) => console.log(value)}
      />
      <CompanyList />
    </section>
  );
};
export default Company;
