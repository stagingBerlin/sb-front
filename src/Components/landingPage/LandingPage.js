import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import { NavLink } from "react-router-dom";
import Curtain from "./Curtain";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <div className="grid-container">
        <div className="grid-col-2 grid-col-span-5 grid-row-4">
          <div className="hero-text-large margin-bttm-l">STAGING BERLIN</div>
        </div>
        <div className="hero-text-small grid-col-3 grid-row-5 grid-col-span-3 margin-bttm-m">
          <div>Look for a theatre job or create one!</div>
        </div>
        <div className="grid-landing-buttons grid-row-6 grid-col-3 grid-col-span-4">
          <NavLink to="/signup" className="button-grid-2fr">
            <div className="">Sign Up </div>
          </NavLink>
          <NavLink to="/login" className="button-grid-2fr">
            <div className="">Login</div>
          </NavLink>
        </div>

        <div className="grid-col-span-4 grid-col-8 grid-row-1 grid-row-end-10  ">
          <img className="logo-frame" src="/img/toplogo.svg" alt="" />
          <div className="deko-bars-container-footer">
            <div className="bar border-left-nav  border-right-nav"></div>
            <div className="bar border-left-nav border-right-nav"></div>
            <div className="bar border-left-nav border-right-nav border-bottom-nav"></div>
          </div>
          <ProjectsCarousel />
          <div className="deko-bars-container-footer">
            <div className="bar border-left-nav border-top-nav border-right-nav"></div>
            <div className="bar border-left-nav border-right-nav"></div>
            <div className="bar border-left-nav border-right-nav"></div>
          </div>
          <div className="border-footer border-right-nav border-left-nav border-bottom-nav"></div>
          {/* <img className="logo-frame" src="/img/bttmlogo.svg" alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
