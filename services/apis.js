// apis.js
import axios from "axios";

export const BASE_URL = "https://humanity-hub1-3599a88da879.herokuapp.com/";

const Client = axios.create({ baseURL: BASE_URL });

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const donate = async (donationAmount) => {
  try {
    const response = await Client.post("/api/donations", { amount: donationAmount });
    return response.data; 
  } catch (error) {
    console.error("Error donating:", error);
    throw error; 
  }
};

export default Client;
