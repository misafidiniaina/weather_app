import React from "react";
import Header from "../components/Header";
import ActualWeather from "../components/ActualWeather";
import TodayWeather from "../components/TodayWeather";
import ThisWeek from "../components/ThisWeek";

const Home = () => {
  return (
    <div>
      <Header />
      <ActualWeather />
      <TodayWeather />
      <ThisWeek />
    </div>
  );
};

export default Home;
