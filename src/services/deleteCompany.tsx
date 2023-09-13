import { ICompany } from "../common/interfaces/ICompany";
import AlertCustom from "../components/AlertCustom";

const BASE_URL = "http://localhost:8080/v1/company";

export const deleteCompany = async (companyData: ICompany) => {
  try {
    const response = await fetch(
      `${BASE_URL}?id=${companyData.id}&status=INATIVO`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    <AlertCustom type="error" message="Erro ao inativar a empresa" />;
  }
};
