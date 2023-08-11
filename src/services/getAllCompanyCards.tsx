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
    if (!response.ok) {
      alert("Erro ao buscar cards.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Erro ao buscar todos os cards de uma empresa. " + error);
  }
};
