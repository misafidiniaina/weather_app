import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ActualWeather from "../components/ActualWeather";
import TodayWeather from "../components/TodayWeather";
import ThisWeek from "../components/ThisWeek";
import { getWeatherData, fetchCities } from "../services/WeatherService";
import Loading from "../components/Loading";

const Home = ({ address }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [cityValidate, setCityValidate] = useState("Antananarivo");
  address = cityValidate;

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData(address);
        console.log("Fetched data:", data); // Debugging log
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error); // Debugging log
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [address]);

  const handleSearch = async (searchValue) => {
    try {
      const data = await fetchCities(searchValue);
      setSearchData(data);
    } catch (error) {
      console.error("Error fetching cities data:", error); // Debugging log
      setError(error.message);
    }
  };

  const handleValidate = (data) => {
    setCityValidate(data);
  };
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header
        options={searchData}
        onSearch={handleSearch}
        onValidate={handleValidate}
      />
      <ActualWeather data={weatherData} />
      <TodayWeather donnees={weatherData} />
      <ThisWeek thisWeekData={weatherData.next5Days} />
    </div>
  );
};

export default Home;
