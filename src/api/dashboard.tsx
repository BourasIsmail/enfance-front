import { getCookie } from "cookies-next";
import { api } from ".";

export async function getDashboard() {
  try {
    const token = getCookie("token");
    const response = await api.get("/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}