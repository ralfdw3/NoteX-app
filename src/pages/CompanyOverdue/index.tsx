import Header from "../../components/Header";
import "./CompanyOverdue.css";
import { Input } from "antd";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import CompanyList from "../../components/CompanyList";

const CompanyOverdue = () => {
  const [allActiveCompanies, setAllActiveCompanies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageNumber = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const getAllActiveCompanies = () => {
    fetch(
      "http://localhost:8080/v1/company/all/overdue?page=" +
        `${pageNumber}` +
        "&size=10&sort=creation,asc",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) =>
        response.json().then((data) => {
          console.log(data);
          setAllActiveCompanies(data.content);
          setTotalPages(data.totalPages);
        })
      )
      .catch((error) => {
        console.log();
        alert("Erro ao buscar as empresas inadimplentes. " + error);
      });
  };

  const getCompaniesBySearchTerm = (searchTerm: string) => {
    fetch(
      "http://localhost:8080/v1/company/overdues?page=" +
        `${pageNumber}` +
        "&size=10&sort=creation,asc&searchTerm=" +
        `${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) =>
        response.json().then((data) => {
          setAllActiveCompanies(data.content);
          setTotalPages(data.totalPages);
        })
      )
      .catch((error) => {
        console.log();
        alert("Erro ao buscar as empresas ativas. " + error);
      });
  };

  useEffect(() => {
    getAllActiveCompanies();
  }, [pageNumber]);

  return (
    <section>
      <Header />
      <Input.Search
        className="search-input"
        placeholder="Digite aqui..."
        onSearch={(value) => getCompaniesBySearchTerm(value)}
      />
      <CompanyList
        allActiveCompanies={allActiveCompanies}
        getAllActiveCompanies={getAllActiveCompanies}
      />
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        handlePageNumber={handlePageNumber}
      />
    </section>
  );
};
export default CompanyOverdue;
