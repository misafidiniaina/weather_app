import React from "react";
import "./ActualWeather.css";
import positionIcon from "../images/position.svg";
import { capitalizeFirstChar, replaceSpace } from "../utils/UtilsFonction";

const ActualWeather = ({ data }) => {
  const position = data.city;
  const degree = data.current.temp;
  const weatherType = data.current.description; 
  const precipitation = data.current.precipitation;
  const humidity = data.current.humidity;
  const wind = data.current.wind;

  //miandraikitra ny sary sy ny representation
  const withUnderscoreName = "clear_sky";
  const backgroundImageUrl = require(`../images/${withUnderscoreName}.jpg`); //sary background
  const representationUrl = require(`../images/representation/${weatherType}.svg`); //sary representation

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
            Precipitation: <span>{precipitation}% </span> <br />
            Humidity: <span>{humidity}%</span>
            <br />
            Wind: <span>{wind} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActualWeather;
