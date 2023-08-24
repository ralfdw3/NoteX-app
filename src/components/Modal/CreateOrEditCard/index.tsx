import { Modal, Input, DatePicker, Select, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCard } from "../../../common/interfaces/IModalCard";
import "./CreateOrEditCard.css";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import AlertError from "../../AlertCustom";

const ModalCreateOrEditCard: React.FC<IModalCard> = ({
  open,
  onCancel,
  headerText,
  cardData,
  isNewCard,
}) => {
  const { TextArea } = Input;

  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [appearance, setAppearance] = useState<Dayjs>(dayjs());
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyPhone, setCompanyPhone] = useState<string | undefined>("");
  const [companyEmail, setCompanyEmail] = useState<string | undefined>("");
  const [status, setStatus] = useState("");
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  useEffect(() => {
    if (cardData != null) {
      setId(cardData.id);
      setDescription(cardData.description ?? "");
      setAppearance(cardData.appearance);
      setCompanyCode(cardData.company.code);
      setCompanyName(cardData.company.name);
      setCompanyPhone(cardData.company.phone);
      setCompanyEmail(cardData.company.email);
      setStatus(cardData.status);
    } else {
      setId("");
      setDescription("");
      setCompanyCode("");
      setCompanyName("");
      setCompanyPhone("");
      setCompanyEmail("");
      setStatus("");
      setAppearance(dayjs());
    }
  }, [cardData]);

  useEffect(() => {
    if (errorAlertVisible) {
      const timer = setTimeout(() => {
        setErrorAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorAlertVisible]);

  const handleSaveCard = () => {
    const formData = {
      id,
      description,
      appearance,
      companyCode,
      companyName,
      companyPhone,
      companyEmail,
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
      .then(() => {
        onCancel();
      })
      .catch(() => {
        setErrorAlertVisible(true);
      });
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-edit-content">
        <h1>{headerText}</h1>
        {errorAlertVisible && (
          <AlertError
            type="error"
            message="Erro na requisição"
            description="Verifique se todos os campos foram preenchidos. Caso o código da empresa não for encontrado no banco de dados, o nome da mesma deve ser informado."
          />
        )}
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
              value: "ABERTO",
              label: "ABERTO",
            },
            {
              value: "EM_NEGOCIACAO",
              label: "EM NEGOCIACAO",
            },
            {
              value: "CONCLUIDO",
              label: "CONCLUIDO",
            },
          ]}
          onChange={(value: string) => setStatus(value)}
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
        <Input
          className="modal-input"
          placeholder="Telefone da empresa.."
          value={companyPhone}
          onChange={(e) => setCompanyPhone(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="E-mail da empresa.."
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
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
