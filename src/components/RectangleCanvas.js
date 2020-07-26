import React, { PureComponent } from "react";
import "../stylings/Default.css";
import Rectangle from "./Rectangle";
import {
  nextSelectStage,
  nextInsertStage,
  mergeSort,
  nextBoggoStage,
} from "../SortingMethods";

export class RectangleCanvas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rectangleArr: [],
      minRect: 150,
      maxRect: 600,
      keyReset: 1,
      finishedSorting: false,
      sortingIter: 0,
      sortSpeed: 1000,
    };
  }

  componentDidMount() {
    this.resetRectArray();
  }

  componentDidUpdate() {
    const { isExecutingSort } = this.props;
    const { finishedSorting } = this.state;
    if (isExecutingSort && !finishedSorting) {
      this.chooseSortingAlgo();
    }
  }

  resetRectArray = () => {
    const { rectangleArr, keyReset } = this.state;
    let rectArrTemp = [];
    for (let i = 0; i < this.props.arrLen; i++) {
      rectArrTemp.push(this.generateRect((keyReset + i) / keyReset));
    }
    this.setState((prevState) => ({
      rectangleArr: rectArrTemp,
      keyReset: prevState.keyReset + Math.random(),
    }));
  };

  generateRect = (id, color) => {
    const { maxRect, minRect, newId } = this.state;
    let height = Math.floor(Math.random() * (maxRect - minRect) + minRect);
    return new Rect(height, 20, id);
  };

  chooseSortingAlgo = () => {
    const { sortingMethod } = this.props;
    const { rectangleArr, finishedSorting } = this.state;
    switch (sortingMethod) {
      case "selection":
        this.iterableSort(nextSelectStage, 0);
        break;
      case "insertion":
        this.iterableSort(nextInsertStage, 1);
        break;
      case "merge":
        this.setState({
          rectangleArr: mergeSort(rectangleArr, Rect.compare),
          finishedSorting: true,
        });
        break;
      case "boggo":
        setInterval(() => {
          let [sortingStage, isSorted] = nextBoggoStage(
            rectangleArr,
            Rect.compare
          );
          console.log(sortingStage, isSorted);
          this.setState({
            rectangleArr: sortingStage,
            finishedSorting: true,
          });
        }, 1000);
    }
  };

  iterableSort = (algorithm, startIndex) => {
    const { rectangleArr, sortingIter, sortSpeed } = this.state;
    const iteration = sortingIter + startIndex;
    if (iteration < rectangleArr.length) {
      setTimeout(
        () =>
          this.setState({
            rectangleArr: algorithm(rectangleArr, iteration, Rect.compare),
            sortingIter: sortingIter + 1,
          }),
        sortSpeed
      );
    } else {
      this.setState({
        sortingIter: 0,
        finishedSorting: true,
      });
    }
  };

  render() {
    const { rectangleArr } = this.state;
    return (
      <ul
        style={{
          backgroundColor: "#323232",
          minHeight: "100vh",
          listStyleType: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {rectangleArr.map((rect) => {
          // console.log(rect);
          return (
            <li key={rect.getID()} style={{ margin: "10px" }}>
              {rect.getJSX()}
            </li>
          );
        })}
      </ul>
    );
  }
}

class Rect {
  constructor(height, width, id) {
    this._id = id;
    this._height = height;
    this._width = width;
    this._outlineColor = "maroon";
    this._outlineWidth = 4;
  }

  setOutlineColor = (color) => {
    console.log("ran", color);
    this._outlineColor = color;
  };

  getHeight = () => this._height;

  getJSX = () => (
    <Rectangle
      height={this._height}
      width={this._width}
      outlineWidth={this._outlineWidth}
      outlineColor={this._outlineColor}
    />
  );

  getID = () => this._id;

  static compare = (rect1, rect2) => rect1.getHeight() > rect2.getHeight();
}

export default RectangleCanvas;

// import React from "react";
// import Rectangle from "./Rectangle";

// function RectangleCanvas({ valArr }) {
//   return (
//     <>
//       <ul>
//         {valArr.map((elem) => (
//           <li key={elem.id}>
//             <Rectangle width={20} height={elem.value} />
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default React.memo(RectangleCanvas);
