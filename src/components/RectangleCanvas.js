import React, { PureComponent } from "react";
import Rectangle from "./Rectangle";
import SelectionSort from "./sortingAlgorithms/SelectionSort";
import InsertionSort from "./sortingAlgorithms/InsertionSort";
import MergeSort from "./sortingAlgorithms/mergeSort/MergeSort";
import QuickSort from "./sortingAlgorithms/QuickSort";
// import MergeSort from "./sortingAlgorithms/mergeSort/MergeSort";

export class RectangleCanvas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rectangleArr: [],
      minRect: 150,
      maxRect: 600,
      keyReset: 1,
      finishedSorting: false,
      methodComponent: null,
      currentMethod: null,
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
    if (!this.props.updated || this.props.resetArr)
      this.updateSortingComponent();
  }

  render() {
    return this.state.methodComponent;
  }

  updateSortingComponent = () => {
    console.log("update");
    const {
      sortingMethod,
      isExecutingSort,
      toggleExecutingSort,
      sortingSpeed,
      sortingOptions,
      isUpdated,
    } = this.props;
    const { rectangleArr, arrKey, currentMethod } = this.state;
    let updateComponent;
    if (currentMethod !== sortingMethod) {
      for (let i = 0; i < rectangleArr.length; i++) {
        rectangleArr[i].setOutlineColor("maroon");
      }
      this.setState({ currentMethod: sortingMethod });
    }
    if (sortingMethod === 0) {
      updateComponent = (
        <SelectionSort
          key={arrKey}
          rectangleArr={rectangleArr}
          isExecutingSort={isExecutingSort}
          toggleExecutingSort={toggleExecutingSort}
          sortingSpeed={sortingSpeed}
        />
      );
    } else if (sortingMethod === 1) {
      updateComponent = (
        <InsertionSort
          key={arrKey}
          rectangleArr={rectangleArr}
          isExecutingSort={isExecutingSort}
          toggleExecutingSort={toggleExecutingSort}
          sortingSpeed={sortingSpeed}
        />
      );
    } else if (sortingMethod === 2) {
      updateComponent = (
        <MergeSort
          key={arrKey}
          rectangleArr={rectangleArr}
          isExecutingSort={isExecutingSort}
          toggleExecutingSort={toggleExecutingSort}
          sortingSpeed={sortingSpeed}
        />
      );
    } else if (sortingMethod === 3) {
      updateComponent = (
        <QuickSort
          key={arrKey}
          rectangleArr={rectangleArr}
          isExecutingSort={isExecutingSort}
          toggleExecutingSort={toggleExecutingSort}
          sortingSpeed={sortingSpeed}
        />
      );
    }

    isUpdated(true);
    this.setState({
      methodComponent: updateComponent,
    });
  };

  resetRectArray = () => {
    console.log("ResetArray");
    const { keyReset } = this.state;
    const { toggleResetArr } = this.props;
    let rectArrTemp = [];
    for (let i = 0; i < this.props.arrLen; i++) {
      rectArrTemp.push(this.generateRect((keyReset + i) / keyReset));
    }
    this.setState(
      (prevState) => ({
        rectangleArr: rectArrTemp,
        keyReset: prevState.keyReset + Math.random(),
        arrKey: prevState.arrKey + 1,
      }),
      () => this.updateSortingComponent()
    );
    toggleResetArr();
  };

  generateRect = (id, color) => {
    const { maxRect, minRect, newId } = this.state;
    let height = Math.floor(Math.random() * (maxRect - minRect) + minRect);
    return new Rectangle(height, 20, id);
  };
}

export default RectangleCanvas;
