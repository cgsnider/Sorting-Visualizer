import React from "react";

class Rectangle {
  constructor(height, width, id) {
    this._id = id;
    this._height = height;
    this._width = width;
    this._outlineColor = "maroon";
    this._outlineWidth = 4;
    this._backgroundColor = Rectangle.getDefaultBgColor();
  }

  setOutlineColor = (color) => (this._outlineColor = color);

  getBgColor = () => this._backgroundColor;

  setBgColor = (color) => (this._backgroundColor = color);

  getHeight = () => this._height;

  getJSX = () => (
    <Rect
      height={this._height}
      width={this._width}
      outlineWidth={this._outlineWidth}
      outlineColor={this._outlineColor}
      backgroundColor={Rectangle.rgbString(this._backgroundColor)}
    />
  );

  getID = () => this._id;

  static getDefaultBgColor = () => {
    return { red: 30, green: 144, blue: 255 };
  };

  static rgbString = (rgbArr) => {
    const { red, green, blue } = rgbArr;
    return `rgb(${red},${green},${blue})`;
  };

  static areMatchingArrays = (arr1, arr2) => {
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++)
      if (!this.matching(arr1[i], arr2[i])) return false;
    return true;
  };

  /** Returns true if subArr is a subarray of arr*/
  static isSubArray(arr, subArr) {
    let tempArr = arr.slice();
    if (subArr.length === 1)
      return Rectangle.findRectIndex(tempArr, subArr[0]) !== -1;
    else if (subArr.length > arr.length) return false;
    else if (subArr.length === arr.length)
      return Rectangle.areMatchingArrays(arr, subArr);

    for (let i = 0; i < subArr.length; i++) {
      let idx = Rectangle.findRectIndex(tempArr, subArr[i]);
      if (idx === -1) return false;
      else if (i !== 0 && idx > 0) i = -1;
      else tempArr = tempArr.slice(idx + 1);
    }
    return true;
  }

  static findRectIndex(arr, elem) {
    for (let i = 0; i < arr.length; i++)
      if (Rectangle.matching(arr[i], elem)) return i;
    return -1;
  }

  static matching = (rect1, rect2) => {
    if (rect1.getID() == rect2.getID()) return true;
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
