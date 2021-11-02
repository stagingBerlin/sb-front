import React from "react"
import FeaturedProjects from "./FeaturedProjects"
import { NavLink } from "react-router-dom"

function LandingPage() {
  return (
    <div>
      <div>STAGING BERLIN</div>
      <div>Look for a theatre job or create one!</div>
      <NavLink to="/signup">Sign Up</NavLink> 
      <NavLink to="/login">Login</NavLink>
      <FeaturedProjects/>
    </div>
    
  );
}

export default LandingPage;
