import { elementAcceptingRef } from "@mui/utils";
import React, { useEffect, useRef, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import FeaturedProject from "./FeaturedProject";

function ProjectsCarousel() {

const testImages =[
    "/slider-test-img/3-25.jpg",
    "/slider-test-img/1.jpg",
    "/slider-test-img/7.jpeg.webp",
    "/slider-test-img/Cake.jpg"
]

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

  const [transitionState, setTransition] = useState({
    translate: carouselWidth,
    transition: 0.45,
  });

  const { translate, transition } = transitionState;

  return (
      <div className="carousel-container" ref={carouselRef}>
        <FeaturedProjects
        //not passing the prop properly 
          translate={translate}
          transition={transition}
          width={carouselWidth * testImages.length}
          testImages={testImages}
        />
      </div>
  );
}

export default ProjectsCarousel;
