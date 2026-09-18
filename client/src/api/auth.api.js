import api from "./api";

export const register = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log(error.response?.data?.message);
    }
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error.response.data.message);
    throw error;
  }
};

export const me = async () => {
  try {
    const response = await api.get("/auth/me");
    
    return response?.data;
  } catch (error) {
    console.error("User Not Found", error.response.data.message);
    throw error;
  }
}
