import { Modal, Input, Button, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCompany } from "../../../common/interfaces/IModalCompany";
import { useState, useEffect } from "react";
import "./EditCard.css";

const ModalEditCompany: React.FC<IModalCompany> = ({
  open,
  onCancel,
  companyData,
}) => {
  const [id, setId] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [code, setCode] = useState(0);
  const [phone, setPhone] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (companyData != null) {
      setId(companyData.id);
      setName(companyData.name);
      setCode(companyData.code);
      setPhone(companyData.phone);
      setEmail(companyData.email);
      setStatus(companyData.status);
    }
  }, [companyData]);

  const handleSaveCard = () => {
    const formData = {
      id,
      name,
      code,
      phone,
      email,
      status,
    };
    fetch("http://localhost:8080/v1/company", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onCancel();
      })
      .catch((error) => {
        console.log(formData);
        console.error(error);
        alert("Erro ao alterar os dados da empresa.");
      });
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={700} centered>
      <Content className="modal-edit-content">
        <h1>Editar dados da empresa</h1>
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
              value: "ATIVO",
              label: "ATIVO",
            },
            {
              value: "INATIVO",
              label: "INATIVO",
            },
            {
              value: "INADIMPLENTE",
              label: "INADIMPLENTE",
            },
          ]}
          onChange={(value: string) => setStatus(value)}
        />
        <Input
          className="modal-input"
          placeholder="Nome da empresa.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="modal-input"
          placeholder="Código da empresa.."
          value={code}
          onChange={(e) => setCode(e.target.value)}
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

export default ModalEditCompany;
