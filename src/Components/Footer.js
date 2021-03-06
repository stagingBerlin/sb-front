import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="grid-container ">
        <div className="grid-footer grid-col-span-10 border-top grid-col-2">
          <div className="grid-col-7 grid-col-span-2">
            <div className=" footer-link border-left">New to Berlin?</div>
          </div>
          <div className="grid-col-span-2">
            <div className="footer-link border-left ">Want to invest in Talent?</div>
          </div>
        </div>
      </div>
      <div className="deko-bars-container-footer">
        <div className="bar border-top-nav"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="curve-left border-right-nav border-bottom-nav"></div>
        <div className="curve-right border-left-nav border-bottom-nav"></div>
      </div>
      <div className="border-footer border-right-nav border-left-nav"></div>
    </div>
  );
}

export default Footer;
