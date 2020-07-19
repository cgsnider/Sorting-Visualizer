import React, { Component } from "react";
import Rectangle from "./Rectangle";

import "../stylings/RectangleCanvas.css";

export class RectangleCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rectList: [],
      elementId: 0,
    };

    for (let i = 0; i < 10; i++) {
      this.state.rectList.push(
        new RectangleElem(this.state.elementId++, 150 + Math.random() * 150)
      );
    }
    console.log(this.state.rectList);
  }

  render() {
    return (
      <ul>
        {this.state.rectList.map((elem) => (
          <li key={elem.id}>{elem.jsx}</li>
        ))}
      </ul>
    );
  }
}

class RectangleElem {
  constructor(id, height, width) {
    this.id = id;
    this.width = width ? width : 20;
    this.height = height ? height : 200;
    this.jsx = <Rectangle width={this.width} height={this.height} />;
  }
}

export default RectangleCanvas;
