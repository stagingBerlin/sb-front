import { height } from "@mui/system";
import React, { useContext } from "react";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";


function FeaturedProjects(props) {
  return (
    <div
      style={{
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        height: "fit-content",
        width: `${props.width}px`,
        display: "flex",
      }}
    >
      {props.testImages.map((item, i) => (
        <ProjectCard key={item + i} content={item} />
      ))}
    </div>
  );
}

export default FeaturedProjects;
