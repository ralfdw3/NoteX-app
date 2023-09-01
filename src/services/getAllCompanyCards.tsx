import AlertCustom from "../components/AlertCustom";

const BASE_URL = "http://localhost:8080/v1/card";

export const getAllCompanyCards = async (pageNumber: number, id: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", pageNumber.toString());
  queryParams.append("size", "10");
  queryParams.append("sort", "creation,asc");
  queryParams.append("companyId", id);

  try {
    const response = await fetch(`${BASE_URL}/all/?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    <AlertCustom
      type="error"
      message="Erro ao buscar todos os cards de uma empresa"
    />;
  }
};
