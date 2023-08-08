import { Modal, Input, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { IModalCompany } from "../../../common/interfaces/IModalCompany";
import { useState, useEffect } from "react";
import "./EditCard.css";

const ModalEditCompany: React.FC<IModalCompany> = ({
  open,
  onCancel,
  companyData,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState<string | undefined>("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (companyData != null) {
      setId(companyData.id);
      setName(companyData.name);
      setCode(companyData.code);
    }
  }, [companyData]);

  const handleSaveCard = () => {
    const formData = {
      id,
      name,
      code,
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
        console.log(formData);
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
