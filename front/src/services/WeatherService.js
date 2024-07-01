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



export const getLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    const data = await response.json();
    const locationInfo = {
      city: data.city,
      region: data.region,
      contry: data.country
    }
    return locationInfo;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error; // Optional: propagate the error back to the caller
  }
}