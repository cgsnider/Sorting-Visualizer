import React from "react";

class Rectangle {
  constructor(height, width, id) {
    this._id = id;
    this._height = height;
    this._width = width;
    this._outlineColor = "maroon";
    this._outlineWidth = 4;
    this._backgroundColor = "dodgerblue";
  }

  setOutlineColor = (color) => (this._outlineColor = color);

  setBackgroundColor = (color) => (this._backgroundColor = color);

  getHeight = () => this._height;

  getJSX = () => (
    <Rect
      height={this._height}
      width={this._width}
      outlineWidth={this._outlineWidth}
      outlineColor={this._outlineColor}
      backgroundColor={this._backgroundColor}
    />
  );

  getID = () => this._id;

  static areMatchingArrays = (arr1, arr2) => {
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++)
      if (!this.matching(arr1[i], arr2[i])) return false;
    return true;
  };

  static matching = (rect1, rect2) => {
    if (rect1.getID() == rect2.getID()) {
      return true;
    }
  };

  static compare = (rect1, rect2) => rect1.getHeight() > rect2.getHeight();
}

function Rect({ height, width, outlineWidth, outlineColor, backgroundColor }) {
  const style = {
    backgroundColor: `${backgroundColor}`,
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
