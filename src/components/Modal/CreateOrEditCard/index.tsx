import { Modal, Input, DatePicker, Select, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCard } from "../../../common/interfaces/IModalCard";
import "./CreateOrEditCard.css";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";

const ModalCreateOrEditCard: React.FC<IModalCard> = ({
  open,
  onCancel,
  headerText,
  cardData,
}) => {
  const { TextArea } = Input;
  const location = useLocation();

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [apperrence, setApperrence] = useState<Dayjs>(dayjs());
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (cardData != null) {
      setId(cardData.id);
      setTitle(cardData.title);
      setDescription(cardData.description ?? "");
      setApperrence(cardData.appearance);
      setCompany(cardData.company);
      setStatus(cardData.status);
    } else {
      setApperrence(dayjs());
    }
  }, [cardData]);

  const handleSaveCard = () => {
    const formData = {
      id,
      title,
      description,
      apperrence,
      company,
    };
    fetch("http://localhost:8080/v1/card", {
      method: location.state?.card ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Card salvo");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao salvar o card");
      });
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-edit-content">
        <h1>{headerText}</h1>
        <Select
          className="modal-input"
          showSearch
          style={{ width: 200 }}
          value={status}
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

        <Input
          className="modal-input"
          placeholder="Código da empresa.."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="Título do card.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea
          className="modal-input"
          rows={4}
          placeholder="Descrição do card.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <DatePicker
          className="modal-input"
          style={{ width: "300px" }}
          defaultValue={dayjs(apperrence)}
          placeholder="Selecione uma data"
          format="DD/MM/YYYY"
          onChange={(date: Dayjs | null) => setApperrence(date ?? dayjs())}
        />
      </Content>
      <Content className="modal-edit-content-buttons">
        <Button className="modal-edit-content-button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          className="modal-edit-content-button"
          type="primary"
          onClick={handleSaveCard}
        >
          Salvar
        </Button>
      </Content>
    </Modal>
  );
};

export default ModalCreateOrEditCard;
