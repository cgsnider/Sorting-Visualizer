import React from "react";

function Rectangle({ height, width, outlineWidth, outlineColor }) {
  const style = {
    backgroundColor: "dodgerblue",
    outlineColor: `${outlineColor}`,
    outlineStyle: "solid",
    height: `${height}px`,
    width: `${width}px`,
    outlineWidth: `${outlineWidth}px`,
  };

  const defaultOutline = {};
  return <div style={style}></div>;
}

export default Rectangle;
