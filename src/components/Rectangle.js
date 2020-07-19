import React from "react";
import "../stylings/Rectangle.css";

function Rectangle({ height, width }) {
  const size = {
    height: `${height}px`,
    width: `${width}px`,
  };
  return <div className="rect" style={size}></div>;
}

export default Rectangle;
