import React from "react";
import "./Nointernet.css";
import noInternetIllustration from "../images/nointernet.svg";

const Nointernet = () => {
  return (
    <div className="no-internet-container">
      {" "}
      <div className="offline-illustration">
        <img src={noInternetIllustration} alt="" width={350} />
      </div>
      <div className="no-internet-message">
        <h1>No internet connection</h1><br />
        <div className="message">You can use our service once you're connected</div>
      </div>
    </div>
  );
};

export default Nointernet;
