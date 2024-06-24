import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="fakeBody">
      <div className="Loadingcontainer">
        <span className="firstpoint"></span>
        <div className="points">
          <span className="point"></span>
          <span className="point"></span>
          <span className="point"></span>
        </div>
      </div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
