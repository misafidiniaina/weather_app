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

const Home = ({ address }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [locationCity, setLocationCity] = useState(address);
  const [noresult, setNoresult] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [internetConnexion, setInternetConnexion] = useState(navigator.onLine);
  //const [userLocation, setUserLocation] = useState('Antananarivo')

  const isValideCity = async (cityToVerify) => {
    try {
      const data = await fetchCities(cityToVerify);
      if (data.length === 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error fetching cities data:", error); // Debugging log
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationInfo = await getLocation();
        if (isValideCity(locationInfo.city)) {
          setLocationCity(locationInfo.city);
        } else if (isValideCity(locationInfo.region)) {
          setLocationCity(locationInfo.region);
        } else {
          setLocationCity(locationInfo.country);
        }
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!internetConnexion) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getWeatherData(locationCity);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (internetConnexion) {
      fetchWeatherData();
    }
  }, [locationCity, internetConnexion]);

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
    if (searchData.length === 0) {
      setNoresult(true);
    } else if (searchData.includes(data)) {
      setNoresult(false);
      setLocationCity(data);
    } else {
      setNoresult(true);
    }
    setUserInput(data);
  };
  const handeleComeback = (localisationCity) => {
    setLocationCity(localisationCity);
    setNoresult(false);
  };

  useEffect(() => {
    if (noresult) {
      setNoresult(true);
    }
  }, [noresult]);

  if (!internetConnexion) return <Nointernet />;
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

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
        weatherData && (
          <div>
            <ActualWeather data={weatherData} />
            <TodayWeather donnees={weatherData} />
            <ThisWeek thisWeekData={weatherData.next5Days} />
          </div>
        )
      )}
    </div>
  );
};

export default Home;
