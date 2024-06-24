import React from "react";
import Line from "./Line";
import "./ThisWeek.css";
import { fromatDate } from "../utils/UtilsFonction";

const ThisWeek = ({ thisWeekData }) => {
  return (
    <div className="week-weather-container">
      {thisWeekData.map((day, index) => (
        <Line
          key={index}
          day={fromatDate(day.date)}
          weather={day.description} // change to variable
          degree={day.temp}
        />
      ))}
    </div>
  );
};

export default ThisWeek;
