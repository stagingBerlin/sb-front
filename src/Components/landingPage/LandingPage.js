import React from "react";
import FeaturedProjects from "./FeaturedProjects";
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
        <div className="landing-buttons grid-landing-buttons grid-col-3 grid-col-span-4">
          <div className="button-grid-2fr">
            <NavLink to="/signup" className="">
              Sign Up
            </NavLink>
          </div>
          <div className="button-grid-2fr">
            <NavLink to="/login" className="">
              Login
            </NavLink>
          </div>
        </div>
        <div className="grid-col-span-4 grid-col-8 grid-row-2 outline">
          <FeaturedProjects />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
