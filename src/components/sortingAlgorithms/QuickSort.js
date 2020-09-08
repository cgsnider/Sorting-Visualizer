import React, { PureComponent } from "react";
import { Box, ThemeProvider, colors } from "@material-ui/core";
import Rectangle from "../Rectangle";

export class QuickSort extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rectArr: [],
      sortingProgress: [null, null, null], //[pivot, low, high]
      isSorting: false,
      colors: {
        border: "seaShell",
        pivot: "deepPink",
        unsorted: "maroon",
        sorted: "mediumSeaGreen",
        selected: "goldenRod",
        check: "orangeRed",
      },
    };
  }

  componentDidMount() {
    this.setState({ rectArr: this.props.rectangleArr });
  }

  componentDidUpdate() {
    const { rectArr, isSorting, sortingProgress } = this.state;
    const { isExecutingSort } = this.props;
    if (!isSorting && isExecutingSort) {
      this.sort();
    }
  }

  render() {
    const { rectArr } = this.state;

    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {this.state.rectArr.map((rect) => {
          return (
            <li
              key={rect.getID()}
              style={{ margin: "10px", listStyleType: "none" }}
            >
              {rect.getJSX()}
            </li>
          );
        })}
      </Box>
    );
  }

  sort = (sortedIDX, checkingIDX, selectedIDX) => {
    // console.log(this.state.rectArr);
    const { rectArr } = this.state;
    this.setState(
      {
        isSorting: true,
        sortingProgress: [null, 0, rectArr.length - 1, 0, 0],
      },
      () => {
        this.continueSort(rectArr.slice());
      }
    );
  };

  continueSort = (oldArray) => {
    console.log("continue");
    const array = oldArray.slice();
    this.clock(this.props.sortingProgress, () => {
      const { sortingProgress, colors } = this.state;
      const [pivot, low, high, i, j] = sortingProgress;
      if (pivot === null) {
        this.findPivot(array);
      } else if (array[low].getOutlineColor() !== colors.border) {
        this.movePivot(array);
      } else if (j < high) {
        console.log("scanning");
        this.scan(array);
      }
    });
  };

  scan = (array) => {
    const { sortingProgress, colors } = this.state;
    const [pivot, low, high, i, j] = sortingProgress;
    const tempArr = array.slice();
    if (i === j) {
      tempArr[j].setOutlineColor(colors.selected);
      console.log("i == j", i, j, tempArr);
      this.setState(
        {
          sortingProgress: [pivot, low, high, i, j + 1],
          rectArr: tempArr,
        },
        () => this.continueSort(array)
      );
    } else if (Rectangle.compare(tempArr[i], tempArr[j])) {
      console.log("compare", i, j, tempArr);
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
      this.setState(
        {
          sortingProgress: [pivot, low, high, i + 1, j + 1],
          rectArr: tempArr,
        },
        () => this.continueSort(array)
      );
    } else {
      console.log("else", i, j, tempArr);
      tempArr[j].setOutlineColor(colors.check);
      this.setState(
        {
          sortingProgress: [pivot, low, high, i, j + 1],
          rectArr: tempArr,
        },
        () => this.continueSort(array)
      );
    }
  };

  movePivot = (array) => {
    const tempArr = array.slice();
    const { colors, sortingProgress } = this.state;
    const [pivot, low, high, i, j] = sortingProgress;
    [tempArr[pivot], tempArr[high]] = [tempArr[high], tempArr[pivot]];
    array[low].setOutlineColor(colors.border);
    console.log(tempArr);
    this.setState(
      { rectArr: tempArr, sortingProgress: [high, low, high, i + 1, i + 1] },
      () => {
        console.log("Border added");
        console.log(this.state.rectArr);
        this.continueSort(array);
      }
    );
  };

  findPivot = (array) => {
    const { colors, sortingProgress } = this.state;
    const [pivot, low, high, i, j] = sortingProgress;
    const middle = Math.trunc((high - low) / 2);
    // console.log(low, middle, high);
    array[low].setOutlineColor(colors.pivot);
    array[high].setOutlineColor(colors.pivot);
    array[middle].setOutlineColor(colors.pivot);
    // console.log("checkpoint", array.slice());
    this.setState({ rectArr: array }, () => {
      this.clock(sortingProgress, () => {
        let pivotIdx = this.findMedian([high, middle, low], array);
        if (pivotIdx === high) {
          array[low].setOutlineColor(colors.unsorted);
          array[middle].setOutlineColor(colors.unsorted);
          pivotIdx = high;
        } else if (pivotIdx === low) {
          array[high].setOutlineColor(colors.unsorted);
          array[middle].setOutlineColor(colors.unsorted);
          pivotIdx = low;
        } else {
          array[high].setOutlineColor(colors.unsorted);
          array[low].setOutlineColor(colors.unsorted);
          pivotIdx = middle;
        }
        this.setState(
          {
            sortingProgress: [pivotIdx, low, high, i, j],
            rectArr: array,
          },
          () => this.continueSort(array)
        );
      });
    });
  };

  findMedian(idxArray, rectArr) {
    let idxClone = idxArray.slice();
    let idxSorted = [];
    idxSorted.unshift(idxClone.shift());
    while (idxClone.length > 0) {
      let i = 0;
      for (
        ;
        i < idxSorted.length &&
        Rectangle.compare(rectArr[idxClone[0]], rectArr[idxSorted[i]]);
        i++
      );
      if (i === idxSorted.length) {
        idxSorted.push(idxClone.shift());
      } else if (i === 0) {
        idxSorted.unshift(idxClone.shift());
      } else {
        idxSorted = idxSorted
          .slice(0, i)
          .concat(idxClone.splice(0, 1))
          .concat(idxSorted.slice(i));
      }
    }
    return idxSorted[Math.trunc(idxSorted.length / 2)];
  }

  // quickSort = (array, low, high) => {
  //   const { sortingProgress } = this.state;
  //   // console.log(array.slice());
  //   if (low < high) {
  //     let pivotIdx = this.partition(array, low, high);
  //     this.quickSort(array, low, pivotIdx);
  //     this.quickSort(array, pivotIdx + 1, high);
  //   }
  // };

  // partition = (array, low, high) => {
  //   if (low < high) {
  //     console.log("begin partition", high - low);
  //     let pivot = array[low];
  //     let leftWall = { val: low };
  //     this.partitionR(array, high, pivot, leftWall, low + 1);
  //     console.log("returning part");
  //   }
  // };

  // partitionR = (array, high, pivot, leftWall, i) => {
  //   console.log("recursion", i);
  //   if (array) {
  //     if (i < high) {
  //       if (Rectangle.compare(pivot, array[i])) {
  //         [array[i], array[leftWall.val]] = [array[leftWall.val], array[i]];
  //         leftWall.val++;
  //         this.setState({ rectArr: array }, () =>
  //           this.partitionR(array, high, pivot, leftWall, i + 1)
  //         );
  //       }
  //     } else {
  //       [pivot, array[leftWall.val]] = [array[leftWall.val], pivot];
  //       this.setState({ rectArr: array }, this.partitionR());
  //     }
  //   }
  // };

  clock = (progress, funct) => {
    const { sortingSpeed, isExecutingSort } = this.props;
    if (isExecutingSort)
      setTimeout(() => {
        if (isExecutingSort) funct();
        else
          this.setState({
            sortingProgress: progress,
            isSorting: false,
          });
      }, sortingSpeed);
    else
      this.setState({
        sortingProgress: progress,
        isSorting: false,
      });
  };
}

export default QuickSort;
