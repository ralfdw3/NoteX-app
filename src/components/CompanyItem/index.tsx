import { AiOutlineHistory } from "react-icons/ai";
import "./CompanyItem.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { ICompany } from "../../common/interfaces/ICompany";
import { deleteCompany } from "../../services/deleteCompany";
import EditAndExcludeIcons from "../EditAndExcludeIcons";
import ModalCardHistory from "../Modal/CardHistory";
import ModalEditCompany from "../Modal/EditCompany";

interface ICompanyProps {
  companyData: ICompany;
  getAllActiveCompanies: () => void;
}

const CompanyItem: React.FC<ICompanyProps> = ({
  companyData,
  getAllActiveCompanies,
}) => {
  const handleDeleteCompany = () => {
    deleteCompany(companyData);
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
        company={companyData}
        onCancel={() => setIsHistoryModalOpen(false)}
        open={isHistoryModalOpen}
      />
    </div>
  );
};
export default CompanyItem;
