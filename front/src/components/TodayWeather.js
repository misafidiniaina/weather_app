import React, { useEffect } from "react";
import Card from "./Card";
import "./TodayWeather.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TodayWeather = ({ donnees }) => {
  const times = ["morning", "afternoon", "evening", "night"];

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(".card", { autoAlpha: 0, scale: 0.8, duration: 0.5,  stagger: 0.1});
  });

  return (
    <div className="todayDetails_container">
      {times.map((time) => (
        <Card key={time} data={donnees.nextPeriods} time={time} />
      ))}
    </div>
  );
};

export default TodayWeather;
