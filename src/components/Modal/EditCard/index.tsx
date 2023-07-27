import { Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCard } from "../../../common/interfaces/IModalCard";

const ModalEditCard: React.FC<IModalCard> = ({ open, onCancel }) => {
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <div>
        <h1>Editar card</h1>
        <div>
          <Content>
            <p>teste</p>
          </Content>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditCard;
