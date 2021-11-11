import { height } from "@mui/system";
import React from "react";

function FeaturedProjects(props) {
  return (
    <div
      style={{
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        height: "100%",
        width: `${props.width}px`,
        display: "flex",
        backgroundColor: "red"
      }}
    >
      Featured Projects
    </div>
  );
}

export default FeaturedProjects;
