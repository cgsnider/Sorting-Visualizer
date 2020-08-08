import React, { PureComponent } from "react";
import Rectangle from "./Rectangle";
import SelectionSort from "./sortingAlgorithms/SelectionSort";
import InsertionSort from "./sortingAlgorithms/InsertionSort";

export class RectangleCanvas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rectangleArr: [],
      minRect: 150,
      maxRect: 600,
      keyReset: 1,
      finishedSorting: false,

      arrKey: 0,
    };
  }

  componentDidMount() {
    this.resetRectArray();
  }

  componentDidUpdate() {
    const { resetArr, arrLen } = this.props;
    const { rectangleArr } = this.state;
    if (arrLen != rectangleArr.length || resetArr) this.resetRectArray();
  }

  render() {
    const { rectangleArr, arrKey } = this.state;
    const { isExecutingSort, toggleExecutingSort, sortingSpeed } = this.props;
    return (
      <InsertionSort
        key={arrKey}
        rectangleArr={rectangleArr}
        isExecutingSort={isExecutingSort}
        toggleExecutingSort={toggleExecutingSort}
        sortingSpeed={sortingSpeed}
      />
    );
  }

  resetRectArray = () => {
    const { keyReset } = this.state;
    const { toggleResetArr } = this.props;
    let rectArrTemp = [];
    for (let i = 0; i < this.props.arrLen; i++) {
      rectArrTemp.push(this.generateRect((keyReset + i) / keyReset));
    }
    this.setState((prevState) => ({
      rectangleArr: rectArrTemp,
      keyReset: prevState.keyReset + Math.random(),
      arrKey: prevState.arrKey + 1,
    }));
    toggleResetArr();
  };

  generateRect = (id, color) => {
    const { maxRect, minRect, newId } = this.state;
    let height = Math.floor(Math.random() * (maxRect - minRect) + minRect);
    return new Rectangle(height, 20, id);
  };
}

export default RectangleCanvas;
