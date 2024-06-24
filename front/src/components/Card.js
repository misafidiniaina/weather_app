import React from "react";
import "./Card.css";
import { capitalizeFirstChar } from "../utils/UtilsFonction";

//mbola misy ovaina le resaka weatherType miandry sary

const Card = ({ data, time }) => {
  const weatherType = data[time]?.description
  const weather = require(`../images/representation/${weatherType}.svg`);
  const temperature = data[time]?.temp;

  return (
    <div className="card">
      <div className="time">
        <p>{capitalizeFirstChar(time)}</p>
      </div>
      <div className="weatherType">
        <img src={weather} alt="" width={70} height={70} />
      </div>
      <div className="time_degree">
        <p>{temperature}°</p>
      </div>
    </div>
  );
};

export default Card;
