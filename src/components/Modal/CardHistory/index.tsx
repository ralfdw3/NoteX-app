import { Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCardHistory } from "../../../common/interfaces/IModalCardHistory";
import AllCompanyCardsList from "./AllCompanyCardsList";
import Pagination from "../../Pagination";

const ModalCardHistory: React.FC<IModalCardHistory> = ({
  open,
  onCancel,
  companyId,
  companyName,
  allCompanyCards,
  totalPages,
  handlePageNumber,
  pageNumber,
}) => {
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-history-content">
        <h1>Histórico de cards</h1>
        <h2>
          {companyId} - {companyName}
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
