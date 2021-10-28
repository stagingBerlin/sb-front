import React from "react";
import FeaturedProjects from "./FeaturedProjects";

function LandingPage() {
  return (
      <div className="stage">
        <div className="stage__container">
          <div className="stage__img__container-left">
            <img className="img-left" src="./img/pillar.png" alt="" />
            <div className="test">Test</div>
          </div>
          <div className="stage__img__container-right">
            <img className="img-right" src="./img/pillar.png" alt="" />
          </div>
          <FeaturedProjects />
        </div>
      </div>
  );
}

export default LandingPage;
