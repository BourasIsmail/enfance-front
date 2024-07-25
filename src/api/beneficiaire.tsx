import { getCookie } from "cookies-next";
import { api } from ".";

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

export function getBeneficiaire(id: number) {
  return async () => {
    const token = getCookie("token");
    const { data } = await api.get("/beneficiaires/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}
