import { elementAcceptingRef } from "@mui/utils";
import React, { useEffect, useRef, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";

function ProjectsCarousel() {
  // finding width of carousel container to get the value for transition
  const carouselRef = useRef();
  const [carouselWidth, setCarouselWidth] = useState();
  const getCarouselWidth = () => {
    const newWidth = carouselRef.current.clientWidth;
    setCarouselWidth(newWidth);
  };
  useEffect(() => {
    getCarouselWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getCarouselWidth);
  }, []);

  return (
    <div>
      <div>{carouselWidth}</div>
      <div className="carousel-container" ref={carouselRef}>
        <FeaturedProjects translate={carouselWidth}/>
      </div>
    </div>
  );
}

export default ProjectsCarousel;
