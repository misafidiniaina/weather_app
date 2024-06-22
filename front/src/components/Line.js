import React from "react";
import "./Line.css";
import { replaceUnderscores } from "../utils/UtilsFonction";

const Line = ({ day, weather, degree }) => {
  const weatherImgUrl = require(`../images/${weather}_representation.svg`);

  return (
    <div className="line">
      <div className="day">{day}</div>
      <div className="weather-representation">
        <img src={weatherImgUrl} alt="" width={40} height={40} />
      </div>
      <div className="weather-details">
        <p>
          {replaceUnderscores(weather)} &nbsp;&nbsp;<span>{degree}°</span>
        </p>
      </div>
    </div>
  );
};

export default Line;
