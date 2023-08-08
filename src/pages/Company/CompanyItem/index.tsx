import EditAndExcludeIcons from "../../../components/EditAndExcludeIcons";
import { AiFillDownCircle } from "react-icons/ai";
import "./CompanyItem.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ICompany } from "../../../common/interfaces/ICompany";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import ModalEditCompany from "../../../components/Modal/EditCompany";

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
        <AiFillDownCircle size={25} className="company-cards-icon" />
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
    </div>
  );
};

export default CompanyItem;
