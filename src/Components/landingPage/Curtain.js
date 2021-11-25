import React, { useEffect, useRef, useState, useContext } from "react";
import sliderContext from "./sliderContext";

function Curtain() {
    const curtain= "/img/curtain.png"
  return (
    <div className="curtain-container">
      <div
        className="curtain"
        style={{
        height: "120%",
          width: "100%",
          backgroundImage: `url(${curtain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          position: "absolute",
          zIndex: "20"
        }}
      ></div>
    </div>
  );
}

export default Curtain;
