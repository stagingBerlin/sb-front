import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div className="content-margin-top">
      <div className="grid-container">
        <div className="grid-col-2 grid-col-span-5">
          <div className="hero-text-large">STAGING BERLIN</div>
        </div>
        <div className="hero-text-small grid-col-3 grid-col-span-3">
          <div>Look for a theatre job or create one!</div>
        </div>
        <div className=""></div>
        <div className="grid-landing-buttons grid-col-3 grid-col-span-4">
          <NavLink to="/signup" className="button-grid-2fr">
            <div className="">Sign Up </div>
          </NavLink>
          <NavLink to="/login" className="button-grid-2fr">
            <div className="">Login</div>
          </NavLink>
        </div>
        <div className="grid-col-span-4 grid-col-8 grid-row-2 grid-row-end-10 outline">
          <ProjectsCarousel/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
