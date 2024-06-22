import React from "react";
import "./Card.css";

const Card = ({ time, weatherType, degree }) => {
  const weather = require(`../images/${weatherType}_representation.svg`);
  return (
    <div className="card">
      <div className="time">
        <p>{time}</p>
      </div>
      <div className="weatherType">
        <img src={weather} alt="" width={70} height={70} />
      </div>
      <div className="time_degree">
        <p>{degree}°</p>
      </div>
    </div>
  );
};

export default Card;
