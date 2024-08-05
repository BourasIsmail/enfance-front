import { getCookie } from "cookies-next";
import { api } from ".";

export function getCentre() {
  return async () => {
    const token = getCookie("token");
    const data = await api.get("/Centre", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}
