import { Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCardHistory } from "../../../common/interfaces/IModalCardHistory";
import AllCompanyCardsList from "./AllCompanyCardsList";
import Pagination from "../../Pagination";
import { useState, useEffect } from "react";
import { getAllCompanyCards } from "../../../services/getAllCompanyCards";

const ModalCardHistory: React.FC<IModalCardHistory> = ({
  open,
  onCancel,
  company,
}) => {
  const [allCompanyCards, setAllCompanyCards] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageNumber = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const getCompanies = async (pageNumber: number, id: string) => {
    try {
      const data = await getAllCompanyCards(pageNumber, id);
      setAllCompanyCards(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      alert("Erro ao buscar todos os cards de uma empresa.");
    }
  };

  useEffect(() => {
    if (open && company && company.id) {
      getCompanies(pageNumber, company.id);
    }
  }, [open, pageNumber]);

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-history-content">
        <h1>Histórico de cards</h1>
        <h2>
          {company.code} - {company.name}
        </h2>
        <AllCompanyCardsList allCompanyCards={allCompanyCards} />
        <Pagination
          handlePageNumber={handlePageNumber}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      </Content>
    </Modal>
  );
};

export default ModalCardHistory;
