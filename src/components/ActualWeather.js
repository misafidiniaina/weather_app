import React from "react";
import "./ActualWeather.css";
import positionIcon from "../images/position.svg";
import { capitalizeFirstChar } from "../utils/UtilsFonction";

const ActualWeather = () => {
  /*change this variable to change the image background according to the weather type from the back-end code*/
  const position = "Fianarantsoa";
  const degree = "28";
  const weatherType = "sunny";
  const precipitation = "2";
  const humidity = "50";
  const wind = "12";

  //miandraikitra ny sary sy ny representation
  const backgroundImageUrl = require(`../images/${weatherType}.jpg`); //sary background
  const representationUrl = require(`../images/${weatherType}_representation.svg`); //sary representation

  return (
    <div className="parent_container">
      <div
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        className="container"
      >
        <div className="left">
          <div className="weather_information">
            <div className="localisation">
              <img
                src={positionIcon}
                alt="localisation icon"
                width={10}
                height={17}
              />
              <p className="lieu">{position}</p>
            </div>
            <div className="degree">{degree}°</div>
            <div className="weather_type">
              {capitalizeFirstChar(weatherType)}
            </div>
          </div>
          <div className="weather_representation">
            <img
              src={representationUrl}
              alt="weather type representation"
              width={90}
              height={90}
            />
          </div>
        </div>

        <div className="right">
          <p className="details">
            precipitation: <span>{precipitation}% </span> <br />
            humidity: <span>{humidity}%</span>
            <br />
            wind: <span>{wind} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActualWeather;
