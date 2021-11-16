import { height } from "@mui/system";
import React, { useContext } from "react";
import FeaturedProject from "./FeaturedProject";


function FeaturedProjects(props) {
  return (
    <div
      style={{
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        height: "100%",
        width: `${props.width}px`,
        display: "flex",
        backgroundColor: "red",
      }}
    >
      {props.testImages.map((item, i) => (
        <FeaturedProject key={item + i} content={item} />
      ))}
    </div>
  );
}

export default FeaturedProjects;
