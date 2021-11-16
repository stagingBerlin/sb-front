import React, { useContext } from "react";
import sliderContext from "./sliderContext";

function SliderClick(props) {
  console.log(props.width);
  const { carouselWidth, nextSlide, prevSlide } =
    useContext(sliderContext);
  return (
    <div>
      <div
        className="slider-click-right"
        onClick={() => nextSlide()}
        style={{
          width: `${carouselWidth * 0.5}px`,
        }}
      ></div>
      <div
        className="slider-click-left"
        onClick={() => prevSlide()}
        style={{
          width: `${carouselWidth * 0.5}px`,
        }}
      ></div>
    </div>
  );
}

export default SliderClick;
