import React from "react";
import logo from "../images/meteo.svg";
import searchIcon from "../images/search.svg";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" width={150} height={25} />
      </div>
      <div className="searchBar">
        <form action="">
          <img src={searchIcon} alt="search icon" className="searchIcon" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search a city"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
