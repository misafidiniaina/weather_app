import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getWeatherData = async (address) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { address },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchCities = async (searchTerm) => {
  const response = await fetch(`${BASE_URL}/cities?search=${searchTerm}`);
  const data = await response.json();
  return data;
};
