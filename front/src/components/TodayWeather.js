import React from "react";
import Card from "./Card";
import "./TodayWeather.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TodayWeather = ({ donnees }) => {
  const times = ["morning", "afternoon", "evening", "night"];

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(".card", { autoAlpha: 0, scale: 0.7, duration: 1, ease: "power4.out", stagger: 0.1}, "-=0.7");
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
