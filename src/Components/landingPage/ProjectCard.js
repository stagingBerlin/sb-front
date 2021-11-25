import React, { useEffect, useRef, useState, useContext } from "react";
import sliderContext from "./sliderContext";
import Curtain from "./Curtain";
import { Opacity } from "@mui/icons-material";

function ProjectCard({ content }) {
  // const [opacityState, setOpacity] = useState(0);

  // const fadein = () => {
  //   if (opacityState == 1) {
  //     return setOpacity(0);
  //   } else {
  //     return setOpacity(1);
  //   }
  // };

  // const autoPlayRef = useRef();

  // useEffect(() => {
  //   autoPlayRef.current = fadein;
  // });

  // useEffect(() => {
  //   const play = () => {
  //     autoPlayRef.current();
  //   };
  //   const interval = setInterval(play, 4000);
  // }, []);

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

  const { pillarWidth } = useContext(sliderContext);

  return (
    <div className="projectCard-container">
      <div>
        <div
          className="fade"
          // style={{
          //   opacity: `${opacityState}`,
          //   transition: `transform 5s`,
          // }}
        ></div>
        <div
          className="projectCard-Img"
          style={{
            height: "45vh",
            width: "100%",
            backgroundImage: `url(${content})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
          }}
        ></div>
      </div>

      {/* <div
        className="pillar"
        style={{
          height: "100%",
          left: `0px`,
        }}
      >
        <img src="/img/pillar.png" alt="" srcset="" />
      </div> */}
    </div>
  );
}

export default ProjectCard;
