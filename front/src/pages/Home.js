import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ActualWeather from "../components/ActualWeather";
import TodayWeather from "../components/TodayWeather";
import ThisWeek from "../components/ThisWeek";
import {
  getWeatherData,
  fetchCities,
  getLocation,
} from "../services/WeatherService";
import Loading from "../components/Loading";
import Noresult from "../components/Noresult";
import Nointernet from "../components/Nointernet";
import gsap from "gsap";

const Home = ({ address }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [locationCity, setLocationCity] = useState(address);
  const [noresult, setNoresult] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [internetConnexion, setInternetConnexion] = useState(navigator.onLine);
  const [localIndication, setLocalIndication] = useState("");

  const isValideCity = async (cityToVerify) => {
    try {
      const data = await fetchCities(cityToVerify);
      return data.length > 0;
    } catch (error) {
      console.error("Error fetching cities data:", error);
      setError(error.message);
      return false;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationInfo = await getLocation();
        if (await isValideCity(locationInfo.city)) {
          setLocationCity(locationInfo.city);
        } else if (await isValideCity(locationInfo.region)) {
          setLocationCity(locationInfo.region);
        } else {
          setLocationCity(locationInfo.country);
        }
        setLocalIndication("(Your actual position)");
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const handleOnline = () => setInternetConnexion(true);
    const handleOffline = () => setInternetConnexion(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchWeatherData = async () => {
    if (!internetConnexion) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getWeatherData(locationCity);
      if (JSON.stringify(data) !== JSON.stringify(weatherData)) {
        setWeatherData(data);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();

    const intervalId = setInterval(() => {
      if (internetConnexion) {
        fetchWeatherData();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [locationCity, internetConnexion]);

  const handleSearch = async (searchValue) => {
    try {
      const data = await fetchCities(searchValue);
      setSearchData(data);
    } catch (error) {
      console.error("Error fetching cities data:", error);
      setError(error.message);
    }
  };

  const handleValidate = (data) => {
    if (searchData.length === 0) {
      setNoresult(true);
    } else if (searchData.includes(data)) {
      setNoresult(false);
      setLocationCity(data);
    } else {
      setNoresult(true);
    }
    setUserInput(data);
    setLocalIndication("");
  };

  const handeleComeback = (localisationCity) => {
    setLocationCity(localisationCity);
    setNoresult(false);
    setLocalIndication("(Your actual position)");
  };

  useEffect(() => {
    if (noresult) {
      setNoresult(true);
    }
  }, [noresult]);

  if (!internetConnexion) return <Nointernet />;
  if (loading && !weatherData) return <Loading />;
  if (error) return <Nointernet />;

  return (
    <div>
      <Header
        options={searchData}
        onSearch={handleSearch}
        onValidate={handleValidate}
      />
      {noresult ? (
        <Noresult userSearch={userInput} onComeback={handeleComeback} />
      ) : (
        weatherData &&
        weatherData.current && (
          <div>
            <ActualWeather
              data={weatherData}
              localIndication={localIndication}
            />
            <TodayWeather donnees={weatherData} />
            <ThisWeek thisWeekData={weatherData.next5Days} />
          </div>
        )
      )}
    </div>
  );
};

export default Home;
