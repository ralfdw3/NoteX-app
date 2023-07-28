import { Modal, Input, DatePicker, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCard } from "../../../common/interfaces/IModalCard";
import "./CreateOrEditCard.css";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const ModalCreateOrEditCard: React.FC<IModalCard> = ({
  open,
  onCancel,
  title,
}) => {
  const { TextArea } = Input;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Inicializa com o dia atual

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-edit-content">
        <h1>{title}</h1>
        <Select
          className="modal-input"
          showSearch
          style={{ width: 200 }}
          placeholder="Selecione o status"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "ABERTO",
            },
            {
              value: "2",
              label: "EM NEGOCIAÇÃO",
            },
            {
              value: "3",
              label: "CONCLUIDO",
            },
          ]}
        />

        <Input className="modal-input" placeholder="Código da empresa.." />
        <Input className="modal-input" placeholder="Título do card.." />

        <TextArea
          className="modal-input"
          rows={4}
          placeholder="Descrição do card.."
        />

        <DatePicker
          className="modal-input"
          style={{ width: "300px" }}
          value={selectedDate}
          placeholder="Selecione uma data"
          onChange={handleDateChange}
        />
      </Content>
    </Modal>
  );
};

export default ModalCreateOrEditCard;
