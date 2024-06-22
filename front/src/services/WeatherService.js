import axios from "axios";

// URL of the backend API endpoint
const API_URL = process.env.REACT_APP_API_URL; // replace with your actual backend URL

// Function to fetch weather data from the backend
export const getWeatherData = async () => {
  try {
    // Making a GET request to the backend API
    const response = await axios.get(API_URL);
    // Returning the data from the response
    return response.data;
  } catch (error) {
    // Logging any error that occurs during the request
    console.error("Error fetching weather data", error);
    // Propagating the error so it can be handled by the caller
    throw error;
  }
};
