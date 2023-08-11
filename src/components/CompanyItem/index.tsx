import { AiOutlineHistory } from "react-icons/ai";
import "./CompanyItem.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { ICompany } from "../../common/interfaces/ICompany";
import EditAndExcludeIcons from "../EditAndExcludeIcons";
import ModalCardHistory from "../Modal/CardHistory";
import ModalEditCompany from "../Modal/EditCompany";

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
        companyCode={companyData.code}
        companyName={companyData.name}
        onCancel={() => setIsHistoryModalOpen(false)}
        open={isHistoryModalOpen}
      />
    </div>
  );
};

export default CompanyItem;
