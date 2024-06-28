import React, {useRef} from "react";
import "./ActualWeather.css";
import positionIcon from "../images/position.svg";
import { capitalizeFirstChar, replaceSpace } from "../utils/UtilsFonction";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ActualWeather = ({ data, localIndication }) => {
  const position = data.city;
  const degree = data.current.temp;
  const weatherType = data.current.description;
  const precipitation = data.current.precipitation;
  const humidity = data.current.humidity;
  const wind = data.current.wind;
  const hour = data.current.localHour;

  function getTimeOfDayFromHour(hour) {
    if (hour >= 6 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else if (hour >= 18 && hour < 21) {
      return "evening";
    } else {
      return "night";
    }
  }
  const timeOfDay = getTimeOfDayFromHour(hour);

  //miandraikitra ny sary sy ny representation
  const backgroundImageUrl = require(`../images/${timeOfDay}.jpg`); //sary background
  const representationUrl = require(`../images/representation/${weatherType}.svg`); //sary representation





  //animation code
  gsap.registerPlugin(useGSAP);
  const container = useRef();


  useGSAP(() => {
    gsap.from('.detail-content', {y: -100 , autoAlpha: 0 , duration:1 ,stagger:0.2 , ease: "power2.out"}
    )
  })

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
              <div className="cityInformation">
                <p className="lieu">{position}</p>
                <div className="localIndication">{localIndication}</div>
              </div>
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
            <div className="detail-content">
              Precipitation: <span>{precipitation}% </span>
            </div>
            <div className="detail-content">Humidity: <span>{humidity}%</span></div>
            <div className="detail-content">Wind: <span>{wind} km/h</span></div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActualWeather;
