
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

export const fetchEventsByZipCode = async (zipCode) => {
  try {
    const response = await Client.get(`/api/events?zipCode=${zipCode}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events by zip code:", error);
    throw error; 
  }
};

export const fetchEventsByCity = async (city) => {
  try {
    const response = await Client.get(`/api/events?city=${city}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching events by city:", error);
    throw error; 
  }
};

export default Client;
