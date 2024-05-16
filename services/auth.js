
import Client from "./apis";

export const login = async (userData) => {
  try {
    const response = await Client.post("/auth/login", userData);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await Client.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (idToken) => {
  try {
    const response = await Client.post("/auth/google", { idToken });
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await Client.get("/auth/session");
    return response.data;
  } catch (error) {
    throw error;
  }
};
