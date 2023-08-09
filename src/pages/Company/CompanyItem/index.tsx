import EditAndExcludeIcons from "../../../components/EditAndExcludeIcons";
import { AiOutlineHistory } from "react-icons/ai";
import "./CompanyItem.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ICompany } from "../../../common/interfaces/ICompany";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import ModalEditCompany from "../../../components/Modal/EditCompany";
import ModalCardHistory from "../../../components/Modal/CardHistory";

interface ICompanyProps {
  companyData: ICompany;
  getAllActiveCompanies: () => void;
}

const CompanyItem = ({ companyData, getAllActiveCompanies }: ICompanyProps) => {
  const handleDeleteCompany = () => {
    fetch(`http://localhost:8080/v1/company?code=${companyData.code}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        getAllActiveCompanies();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [modal, contextHolder] = Modal.useModal();
  const excludeCompanyModal = () => {
    modal.confirm({
      title: "Confirmar",
      icon: <ExclamationCircleOutlined />,
      content: "Você tem certeza que deseja excluir a empresa?",
      okText: "Sim",
      cancelText: "Cancelar",
      onOk: handleDeleteCompany,
    });
  };

  useEffect(() => {
    getAllActiveCompanies();
  }, [isEditModalOpen]);

  const [allCompanyCards, setAllCompanyCards] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageNumber = (newPageNumber: number) => {
    console.log("pagina");
    setPageNumber(newPageNumber);
  };
  const getAllCompanyCards = (id: string) => {
    fetch(
      "http://localhost:8080/v1/card/all/?page=" +
        `${"0"}` +
        "&size=10&sort=creation,asc&companyId=" +
        `${id}`,
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
          setAllCompanyCards(data.content);
          setTotalPages(data.totalPages);
        })
      )
      .catch((error) => {
        alert("Erro ao buscar todos os cards de uma empresa. " + error);
      });
  };

  useEffect(() => {
    getAllCompanyCards(companyData.id);
  }, [isHistoryModalOpen]);

  return (
    <div className="company-items">
      <div>
        <span>{companyData.code}</span>
        <span> - </span>
        <span>{companyData.name}</span>
      </div>
      <div className="company-icons">
        <AiOutlineHistory
          size={25}
          className="company-cards-icon"
          onClick={() => setIsHistoryModalOpen(true)}
        />
        <EditAndExcludeIcons
          editModal={openEditModal}
          excludeModal={excludeCompanyModal}
        />
        {contextHolder}
      </div>
      <ModalEditCompany
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        companyData={companyData}
      />
      <ModalCardHistory
        companyId={companyData.id}
        companyName={companyData.name}
        onCancel={() => setIsHistoryModalOpen(false)}
        open={isHistoryModalOpen}
        allCompanyCards={allCompanyCards}
        totalPages={totalPages}
        pageNumber={pageNumber}
        handlePageNumber={() => handlePageNumber}
      />
    </div>
  );
};

export default CompanyItem;
