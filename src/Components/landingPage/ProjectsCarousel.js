import { Slider } from "@mui/material";
import { elementAcceptingRef } from "@mui/utils";
import React, { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../helpers/apiCalls";
import FeaturedProjects from "./FeaturedProjects";
import Curtain from "./Curtain";
import SliderClick from "./SliderClick";
import sliderContext from "./sliderContext";


function ProjectsCarousel() {
const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await getAllProjects();
          setProjects(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
    console.log(projects);
  }, []);

  

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
    transition: 0,
  });

  // finding width of carousel container to get the value for transition

  const carouselRef = useRef();
  const [carouselWidth, setCarouselWidth] = useState();
  const [carouselHeight, setCarouselHeight] = useState();

  const resizeCarousel = () => {
    setIndex({
      ...indexState,
      translate: 0,
      activeIndex: 0,
    });
  };

  const getCarouselWidth = () => {
    if (!carouselRef.current) {
      return;
    }
    const newWidth = carouselRef.current.clientWidth;
    setCarouselWidth(newWidth);
  };

  const getCarouselHeight = () => {
    if (!carouselRef.current) {
      return;
    }
    const newHeight = carouselRef.current.clientHeight;
    setCarouselHeight(newHeight);
  };


  useEffect(() => {
    getCarouselWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getCarouselWidth);
  }, []);
  useEffect(() => {
    getCarouselHeight();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getCarouselHeight);
  }, []);


  // after resizing the window restarting the carousel at the beginning

  useEffect(() => {
    window.addEventListener("resize", resizeCarousel);
  }, []);

  // pillar width

  // const pillarRef = useRef();
  // const [pillarWidth, setPillarWidth] = useState();

  // const getPillarWidth = () => {
  //   if (!pillarRef.current) {
  //     return;
  //   }
  //   const newWidth = pillarRef.current.clientWidth;
  //   setPillarWidth(newWidth);
  // };

  // useEffect(() => {
  //   getPillarWidth();
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", getPillarWidth);
  // }, []);

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
    const interval = setInterval(play, 10000);
  }, []);

  return (
    <div className="pillarframe">
      <div className="carousel-container" ref={carouselRef}>
        <sliderContext.Provider
          value={{
            carouselWidth,
            indexState,
            setIndex,
            nextSlide,
            prevSlide,
            // pillarWidth,
          }}
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
      <Curtain/>
      <img
        style={{
          left: `0px`,
          height: "45vh",
          position: "absolute",
          zIndex: "10",
          top: "0px",
        }}
        src="/img/pillar.png"
        alt=""
        srcset=""
        // ref={pillarRef}
      />
      <img
        style={{
          right: `0px`,
          height: "45vh",
          position: "absolute",
          zIndex: "10",
          top: "0px",
        }}
        src="/img/pillar.png"
        alt=""
        srcset=""
        // ref={pillarRef}
      />
    </div>
  );
}

export default ProjectsCarousel;
