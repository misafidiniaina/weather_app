import React from "react";
import Card from "./Card";
import "./TodayWeather.css";

const TodayWeather = ({ donnees }) => {
  const times = ["morning", "afternoon", "evening", "night"];

  return (
    <div className="todayDetails_container">
      {times.map((time) => (
        <Card
          key={time}
          data={donnees.nextPeriods}
          time={time}
        />
      ))}
    </div>
  );
};

export default TodayWeather;
