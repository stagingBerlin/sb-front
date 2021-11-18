import { Slider } from "@mui/material";
import { elementAcceptingRef } from "@mui/utils";
import React, { useEffect, useRef, useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import SliderClick from "./SliderClick";
import sliderContext from "./sliderContext";

function ProjectsCarousel() {
  const testImages = [
    "/slider-test-img/3-25.jpg",
    "/slider-test-img/1.jpg",
    "/slider-test-img/7.jpeg.webp",
    "/slider-test-img/Cake.jpg",
  ];
  // setting initial position via index and translation value

  const [indexState, setIndex] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });
  // finding width of carousel container to get the value for transition

  const carouselRef = useRef();
  const [carouselWidth, setCarouselWidth] = useState();

  const resizeCarousel = () => {
    setIndex({
      ...indexState,
      translate: 0,
      activeIndex: 0,
    });
  };

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

  // after resizing the window restarting the carousel at the beginning

  useEffect(() => {
    window.addEventListener("resize", resizeCarousel);
  }, []);

  // destructuring values

  const { translate, transition, activeIndex } = indexState;

  // updating index to next or previous slide and setting translation value accordingly

  const nextSlide = () => {
    if (activeIndex === testImages.length - 1) {
      return setIndex({
        ...indexState,
        translate: 0,
        activeIndex: 0,
      });
    }
    setIndex({
      ...indexState,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * carouselWidth,
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setIndex({
        ...indexState,
        translate: (testImages.length - 1) * carouselWidth,
        activeIndex: testImages.length - 1,
      });
    }

    setIndex({
      ...indexState,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * carouselWidth,
    });
  };

  //-----------------autoplay

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 4000);
  }, []);

  return (
    <div className="carousel-container" ref={carouselRef}>
      <sliderContext.Provider
        value={{ carouselWidth, indexState, setIndex, nextSlide, prevSlide }}
      >
        <FeaturedProjects
          translate={translate}
          transition={transition}
          width={carouselWidth * testImages.length}
          testImages={testImages}
        />
        {/* <SliderClick /> */}
      </sliderContext.Provider>
    </div>
  );
}

export default ProjectsCarousel;
