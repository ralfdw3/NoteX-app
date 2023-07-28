import { IModalCard } from "../../../common/interfaces/IModalCard";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

interface IExcludeCard {
  title: string;
}

const ModalExcludeCard: React.FC<IExcludeCard> = ({ title }) => {
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "确认",
      cancelText: "取消",
    });
  };

  // Retorne o conteúdo JSX do componente aqui
  return (
    <div>
      <Button onClick={confirm}>Abrir Modal</Button>
      {contextHolder}
    </div>
  );
};

export default ModalExcludeCard;
