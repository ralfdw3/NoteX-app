import { Modal, Input, DatePicker, Select, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCard } from "../../../common/interfaces/IModalCard";
import "./CreateOrEditCard.css";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

const ModalCreateOrEditCard: React.FC<IModalCard> = ({
  open,
  onCancel,
  headerText,
  cardData,
  isNewCard,
}) => {
  const { TextArea } = Input;

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appearance, setAppearance] = useState<Dayjs>(dayjs());
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [status, setStatus] = useState<string | undefined>("");

  useEffect(() => {
    if (cardData != null) {
      setId(cardData.id);
      setTitle(cardData.title);
      setDescription(cardData.description ?? "");
      setAppearance(cardData.appearance);
      setCompanyCode(cardData.company.code);
      setCompanyName(cardData.company.name);
      setStatus(cardData.status);
    } else {
      setAppearance(dayjs());
    }
  }, [cardData]);

  const handleSaveCard = () => {
    const formData = {
      id,
      title,
      description,
      appearance,
      companyCode,
      companyName,
      status,
    };
    fetch("http://localhost:8080/v1/card", {
      method: isNewCard ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("formData");
        console.log(formData);
        console.log("retorno data");
        console.log(data);
        onCancel();
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
              value: "0",
              label: "ABERTO",
            },
            {
              value: "1",
              label: "EM NEGOCIACAO",
            },
            {
              value: "2",
              label: "CONCLUIDO",
            },
          ]}
          onChange={(value: string | undefined) => setStatus(value)}
        />
        <Input
          className="modal-input"
          placeholder="Título do card.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="Nome da empresa.."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="Código da empresa.."
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
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
          defaultValue={dayjs(appearance)}
          placeholder="Selecione uma data"
          format="DD/MM/YYYY"
          onChange={(date: Dayjs | null) => setAppearance(date ?? dayjs())}
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
