import React from "react";
import Card from "./Card";
import "./TodayWeather.css";

const TodayWeather = () => {
  return (
    <div className="todayDetails_container">
      <Card time={"Matin"} weatherType={"sunny"} degree={"25"} />
      <Card time={"Après-midi"} weatherType={"cloudy"} degree={"12"} />
      <Card time={"Soir"} weatherType={"partialy_cloudy"} degree={"18"} />
      <Card time={"Nuit"} weatherType={"raining"} degree={"20"} />
    </div>
  );
};

export default TodayWeather;
