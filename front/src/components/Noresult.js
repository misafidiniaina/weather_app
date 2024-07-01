import React, { useState } from "react";
import noResultIllustration from "../images/noresult.svg";
import "./Noresult.css";
const Noresult = ({ userSearch, onComeback }) => {
  const [actualCity, setActualCity] = useState("Fianarantsoa");

  const handleClick = (e) => {
    onComeback(actualCity);
  };
  return (
    <div className="noresult-container">
      <div className="titre">
        <h1>No result</h1>
      </div>
      <div className="message">
        Their are no result found for "<span>{userSearch}</span>"
      </div>
      <div className="noresult-illustration-container">
        <img src={noResultIllustration} alt="" width={350} height={350} />
      </div>
      <button onClick={handleClick}>Revenir</button>
    </div>
  );
};

export default Noresult;
