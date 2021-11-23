import React, { useEffect, useRef, useState } from "react";

function ProjectCard({ content }) {
  const pillarRef = useRef();
  const [pillarWidth, setPillarWidth] = useState();

  const getPillarWidth = () => {
    if (!pillarRef.current) {
      return;
    }
    const newWidth = pillarRef.current.clientWidth;
    setPillarWidth(newWidth);
  };

  useEffect(() => {
    getPillarWidth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getPillarWidth);
  }, []);

  return (
    <div className="projectCard-container">
      <div
        className="projectCard-Img"
        style={{
          height: "35vh",
          width: "100%",
          backgroundImage: `url(${content})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      ></div>
      <div> This is the title</div>
      <div>Short Intro</div>
      <div> by Owner</div>
      <div
        className="pillar"
        style={{
          height: "100%",
          left: `-${pillarWidth * 0.5}px`,
        }}
      >
        <img src="/img/pillar.png" alt="" srcset="" ref={pillarRef} />
      </div>
    </div>
  );
}

export default ProjectCard;
