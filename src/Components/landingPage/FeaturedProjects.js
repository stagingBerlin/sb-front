import { height } from "@mui/system";
import React from "react";
import FeaturedProject from "./FeaturedProject";

function FeaturedProjects(props) {
    console.log("translate", props.translate);
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
      {props.testImages.map((item) => (
        <FeaturedProject key={item} content={item}/>
      ))}
    </div>
  );
}

export default FeaturedProjects;
