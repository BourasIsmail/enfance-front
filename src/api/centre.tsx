import { getCookie } from "cookies-next";
import { api } from ".";
import { Centre } from "@/type/Centre";

export async function getCentre(): Promise<Centre[]> {
  const token = getCookie("token");
  const data = await api.get("/Centre", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
}
