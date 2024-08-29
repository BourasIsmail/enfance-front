import { getCookie } from "cookies-next";
import { api } from ".";
import { Beneficiaire } from "@/type/Beneficiaire";

export async function getGroupeAges() {
  try {
    const token = getCookie("token");
    const response = await api.get("/groupeAges", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

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

export async function getAllCenters() {
  try {
    const token = getCookie("token");
    const response = await api.get("/centers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllClassifications() {
  try {
    const token = getCookie("token");
    const response = await api.get("/classifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllHandicaps() {
  try {
    const token = getCookie("token");
    const response = await api.get("/handicaps", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMendicites() {
  try {
    const token = getCookie("token");
    const response = await api.get("/mendicites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllServices() {
  try {
    const token = getCookie("token");
    const response = await api.get("/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSituationsDeRue() {
  try {
    const token = getCookie("token");
    const response = await api.get("/situationsDeRue", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSituationsFamiliales() {
  try {
    const token = getCookie("token");
    const response = await api.get("/situationsFamiliales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSituationsFinancieres() {
  try {
    const token = getCookie("token");
    const response = await api.get("/situationsFinancieres", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSituationsMedicales() {
  try {
    const token = getCookie("token");
    const response = await api.get("/situationsMedicales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllViolences() {
  try {
    const token = getCookie("token");
    const response = await api.get("/violences", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}