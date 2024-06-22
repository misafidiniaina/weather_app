import React from "react";
import Line from "./Line";
import "./ThisWeek.css";

const ThisWeek = () => {
  return (
    <div className="week-weather-container">
      <Line day={"Monday 05/06"} weather={"sunny"} degree={"12"} />
      <Line day={"Tuesday 05/06"} weather={"cloudy"} degree={"12"} />
      <Line day={"Wendnesday 05/06"} weather={"raining"} degree={"12"} />
      <Line
        day={"Wendnesday 05/06"}
        weather={"partialy_cloudy"}
        degree={"12"}
      />
      <Line day={"Wendnesday 05/06"} weather={"raining"} degree={"12"} />
    </div>
  );
};

export default ThisWeek;
