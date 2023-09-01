import { IModalCreateCard } from "../../../common/interfaces/IModalCreateCard";
import { Modal, Input, DatePicker, Select, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import AlertError from "../../AlertCustom";
import "../style.css";

const ModalCreateCard: React.FC<IModalCreateCard> = ({ open, onCancel }) => {
  const { TextArea } = Input;

  const [description, setDescription] = useState("");
  const [appearance, setAppearance] = useState<Dayjs>(dayjs());
  const [name, setName] = useState<string | undefined>("");
  const [code, setCode] = useState<number | HTMLInputElement["value"]>();
  const [phone, setPhone] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [status, setStatus] = useState("");
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  useEffect(() => {
    if (errorAlertVisible) {
      const timer = setTimeout(() => {
        setErrorAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorAlertVisible]);

  const handleSaveCard = () => {
    const companyRequest = {
      code,
      name,
      phone,
      email,
    };

    const formData = {
      description,
      appearance,
      companyRequest,
      status,
    };
    fetch("http://localhost:8080/v1/card", {
      method: "POST",
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

  const fetchCompanyInfo = async () => {
    const response = await fetch(`http://localhost:8080/v1/company/${code}`);
    const company = await response.json();
    setName(company.name);
    setPhone(company.phone);
    setEmail(company.email);
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-edit-content">
        <h1>Criar novo card</h1>
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
          placeholder="Código da empresa.."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onBlur={fetchCompanyInfo}
        />
        <Input
          className="modal-input"
          placeholder="Nome da empresa.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="Telefone da empresa.."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="E-mail da empresa.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default ModalCreateCard;
