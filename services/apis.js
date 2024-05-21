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
    const response = await Client.get(`/api/events`, { params: { zipCode } });
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      console.error("Expected JSON response but got:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching events by zip code:", error);
    throw error;
  }
};

export const fetchEventsByCity = async (city) => {
  try {
    const response = await Client.get(`/api/events`, { params: { city } });
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      console.error("Expected JSON response but got:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching events by city:", error);
    throw error;
  }
};

export const fetchAllEvents = async () => {
  try {
    const response = await Client.get(`/api/events`);
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      console.error("Expected JSON response but got:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await Client.post(`/api/events`, eventData);
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      console.error("Expected JSON response but got:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};


export const fetchTestimonies = async () => {
  try {
    const response = await Client.get("/api/testimonies");
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      console.error("Expected JSON response but got:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    throw error;
  }
};

export default Client;
