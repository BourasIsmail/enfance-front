import { getCookie } from "cookies-next";
import { api } from ".";
import { Beneficiaire } from "@/type/Beneficiaire";

export function getBeneficiaires() {
  return async () => {
    const token = getCookie("token");
    const { data } = await api.get("/beneficiaires", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}

export async function getBeneficiaire(id: number) {
  try {
    const token = getCookie("token");
    const response = await api.get(`/beneficiaires/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as Beneficiaire;
  } catch (error) {
    console.log(error);
  }
}
