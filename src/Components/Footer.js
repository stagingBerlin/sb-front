import React from "react";

function Footer() {
  return (
    <div>
      <div className="grid-container border-top">
        <div className="grid-col-9">
          <div className="border-left">New to Berlin?</div>
        </div>
        <div>
          <div className="border-left">Want to invest?</div>
        </div>
      </div>
      <div className="deko-bars-container-footer">
        <div className="bar border-top"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="curve-left border-right border-bottom"></div>
        <div className="curve-right border-left border-bottom"></div>
      </div>
      <div className="border-footer border-right border-left"></div>
    </div>
  );
}

export default Footer;
