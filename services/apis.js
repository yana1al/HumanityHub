
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
  const response = await axios.get(`https://humanity-hub1-3599a88da879.herokuapp.com/api/events?zipCode=${zipCode}`);
  return response.data;
};

export const fetchEventsByCity = async (city) => {
  const response = await axios.get(`https://humanity-hub1-3599a88da879.herokuapp.com/api/events?city=${city}`);
  return response.data;
};

export const fetchAllEvents = async () => {
  const response = await axios.get("https://humanity-hub1-3599a88da879.herokuapp.com/api/events");
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post("https://humanity-hub1-3599a88da879.herokuapp.com/api/events", eventData);
  return response.data;
};

export const fetchTestimonies = async () => {
  try {
    const response = await Client.get("/api/testimonies");
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    throw error;
  }
};

export default Client;
