import React, { Component } from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import Rectangle from "../Rectangle";
import memoize from "lodash/memoize";

export class SelectionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectArr: [],
      sortingProgress: [0, 0, 0], //[sortedIndex, checkingIndex, selectedIndex]
      isSorting: false,
      colors: {
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
    const { rectangleArr, isExecutingSort, toggleExecutingSort } = this.props;
    if (!isSorting && isExecutingSort) {
      let [sortedIndex, checkingIndex, selectedIndex] = sortingProgress;
      this.sort(sortedIndex, checkingIndex, selectedIndex);
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

  // rectArrFromProps = () => {
  //   const { rectangleArr } = this.props;
  // };

  // sort = () => {
  //   this.setState({ isSorting: true });

  //   const { rectArr } = this.state;
  //   const { toggleExecutingSort } = this.props;
  //   const tempArr = rectArr.slice();

  //   for (let i = 0; i < tempArr.length; i++) {
  //     let selectedIDX = i; //color change here

  //     for (let j = i + 1; j < tempArr.length; j++) {
  //       if (Rectangle.compare(tempArr[selectedIDX], tempArr[j])) {
  //         selectedIDX = j; //color change here
  //       }
  //     }
  //     if (selectedIDX !== i) {
  //       [tempArr[i], tempArr[selectedIDX]] = [tempArr[selectedIDX], tempArr[i]];
  //     }
  //   }
  //   this.setState(
  //     { rectArr: tempArr, isSorting: false },
  //     console.log("State Updated")
  //   );
  //   this.forceUpdate();
  //   console.log(rectArr, tempArr);
  //   toggleExecutingSort();
  // };

  // sort = () => {
  //   this.setState({ isSorting: true });
  //   console.log(this.state.rectArr.slice());

  //   const { rectArr, colors } = this.state;
  //   const { toggleExecutingSort, sortingSpeed } = this.props;
  //   const tempArr = rectArr.slice();

  //   for (let i = 0; i < tempArr.length; i++) {
  //     let selectedIDX = i; //color change here
  //     tempArr[i].setOutlineColor(colors.selected);
  //     this.setState({ rectArr: tempArr }, () => {
  //       for (let j = i + 1; j < tempArr.length; j++) {
  //         if (Rectangle.compare(tempArr[selectedIDX], tempArr[j])) {
  //           if (selectedIDX !== i) {
  //             tempArr[selectedIDX].setOutlineColor(colors.check);
  //           }
  //           selectedIDX = j; //color change here
  //           tempArr[i].setOutlineColor(colors.selected);
  //           this.setState({ rectArr: tempArr });
  //         } else {
  //           tempArr[i].setOutlineColor(colors.check);
  //           this.setState({ rectArr: tempArr });
  //         }
  //       }
  //       if (selectedIDX !== i) {
  //         [tempArr[i], tempArr[selectedIDX]] = [
  //           tempArr[selectedIDX],
  //           tempArr[i],
  //         ];

  //         this.setState({ rectArr: tempArr });
  //       }
  //       for (let z = i + 1; z < tempArr.length; z++) {
  //         tempArr[z].setOutlineColor(colors.unsorted);
  //       }
  //       tempArr[i].setOutlineColor(colors.sorted);
  //       this.setState({ rectArr: tempArr });
  //     });
  //   }

  //   toggleExecutingSort();
  // };

  // clock = (funct) => {
  //   const { isExecutingSort, sortingSpeed } = this.props;
  //   setTimeout(() => {
  //     while (!isExecutingSort) {}
  //     funct();
  //   }, sortingSpeed);
  // };

  // outerLoop = () => {
  //   const { outerIter, rectArr } = this.state;
  //   const { selectedColor } = this.state;
  //   const tempRectArr = rectArr.slice();
  //   tempRectArr[outerIter].setOutlineColor(selectedColor);
  //   this.setState((prevState) => ({
  //     rectArr: tempRectArr,
  //     outerIter: prevState.outerIter + 1,
  //   }));
  // };

  // sort = () => {
  //   if (!this.state.isTickDone) {
  //     const { toggleExecutingSort } = this.props;
  //     const {
  //       innerIter,
  //       outerIter,
  //       rectArr,
  //       selectIDX,
  //       isTickDone,
  //       colors,
  //     } = this.state;
  //     const tempArr = rectArr.slice();
  //     if (outerIter >= tempArr.length) {
  //       toggleExecutingSort();
  //     } else if (innerIter === outerIter) {
  //       // tempArr[outerIter].setOutlineColor(colors.selectedColor);
  //       // this.setState((prevState) => ({
  //       //   innerIter: prevState.innerIter + 1,
  //       //   selectedIDX: prevState.outerIter,
  //       //   isTickDone: true,
  //       // }));
  //     } else if (innerIter >= tempArr.length) {
  //       if (selectIDX != outerIter) {
  //         [tempArr[outerIter], tempArr[selectIDX]] = [
  //           tempArr[selectIDX],
  //           tempArr[outerIter],
  //         ];
  //       }
  //       tempArr[outerIter].setOutlineColor(colors.sortedColor);
  //       for (let i = innerIter + 1; i < tempArr.length; i++) {
  //         tempArr[i].setOutlineColor(colors.unsortedColor);
  //       }
  //       // this.setState((prevState) => ({
  //       //   innerIter: prevState.outerIter + 1,
  //       //   outerIter: prevState.outerIter + 1,
  //       //   rectArr: tempArr,
  //       //   selectIDX: prevState.outerIter + 1,
  //       //   isTickDone: true,
  //       // }));
  //     } else if (Rectangle.compare(tempArr[innerIter], tempArr[selectIDX])) {
  //       console.log("newSelected", innerIter);
  //       tempArr[innerIter].setOutlineColor(colors.selectedColor);
  //       if (selectIDX != outerIter) {
  //         tempArr[selectIDX].setOutlineColor(colors.checkColor);
  //       }
  //       // this.setState((prevState) => ({
  //       //   rectArr: tempArr,
  //       //   selectIDX: prevState.innerIter,
  //       //   innerIter: prevState.innerIter + 1,
  //       //   isTickDone: true,
  //       // }));
  //     } else {
  //       tempArr[outerIter].setOutlineColor(colors.checkColor);
  //       // this.setState((prevState) => ({
  //       //   rectArr: tempArr,
  //       //   innerIter: prevState.innerIter + 1,
  //       //   isTickDone: true,
  //       // }));
  //     }
  //   }
  // };

  // clock = () => {
  //   const { isTickDone } = this.state;
  //   const { isExecutingSort, sortingSpeed } = this.props;
  //   if (isTickDone) {
  //     if (!isExecutingSort) {
  //       this.setState({ isTickDone: false });
  //     } else {
  //       setTimeout(() => {
  //         this.setState({ isTickDone: false }, console.log("tick"));
  //       }, sortingSpeed);
  //     }
  //   }
  // };

  sort = (sortedIDX, checkingIDX, selectedIDX) => {
    this.setState({ isSorting: true });
    this.continueSort(sortedIDX, checkingIDX, selectedIDX);
  };

  continueSort = (sortedIDX, checkingIDX, selectedIDX) => {
    const { rectArr } = this.state;
    this.clock(sortedIDX, checkingIDX, selectedIDX, () => {
      if (sortedIDX === rectArr.length) {
        this.endSort();
      } else if (checkingIDX === rectArr.length) {
        this.incrementSortedIndex(
          sortedIDX,
          checkingIDX,
          selectedIDX,
          this.continueSort
        );
      } else if (checkingIDX === sortedIDX) {
        this.beginSearch(
          sortedIDX,
          checkingIDX,
          selectedIDX,
          this.continueSort
        );
      } else if (checkingIDX > sortedIDX) {
        this.search(sortedIDX, checkingIDX, selectedIDX, this.continueSort);
      } else {
        console.log("else");
      }
    });
  };

  endSort = () => {
    this.props.toggleExecutingSort();
    this.setState({ isSorting: false });
  };

  incrementSortedIndex = (sortedIDX, checkingIDX, selectedIDX, funct) => {
    const { rectArr, colors } = this.state;
    const tempArr = rectArr.slice();
    if (selectedIDX > sortedIDX) {
      [tempArr[sortedIDX], tempArr[selectedIDX]] = [
        tempArr[selectedIDX],
        tempArr[sortedIDX],
      ];
    }
    tempArr[sortedIDX].setOutlineColor(colors.sorted);
    this.setState({ rectArr: tempArr }, () =>
      funct(sortedIDX + 1, sortedIDX + 1, sortedIDX + 1)
    );
  };

  beginSearch = (sortedIDX, checkingIDX, selectedIDX, funct) => {
    const { rectArr, colors } = this.state;
    const tempArr = rectArr.slice();
    tempArr[checkingIDX].setOutlineColor(colors.selected);
    for (let i = sortedIDX + 1; i < tempArr.length; i++)
      tempArr[i].setOutlineColor(colors.unsorted);
    this.setState(
      (prevState) => ({
        rectArr: tempArr,
      }),
      () => {
        funct(sortedIDX, checkingIDX + 1, selectedIDX);
      }
    );
  };

  search = (sortedIDX, checkingIDX, selectedIDX, funct) => {
    const { rectArr, colors } = this.state;
    const tempArr = rectArr.slice();

    if (Rectangle.compare(tempArr[selectedIDX], tempArr[checkingIDX])) {
      if (selectedIDX !== sortedIDX) {
        tempArr[selectedIDX].setOutlineColor(colors.check);
      }
      console.log("search");
      tempArr[checkingIDX].setOutlineColor(colors.selected);
      this.setState(
        (prevState) => ({
          rectArr: tempArr,
        }),
        () => funct(sortedIDX, checkingIDX + 1, checkingIDX)
      );
    } else {
      tempArr[checkingIDX].setOutlineColor(colors.check);
      this.setState(
        (prevState) => ({
          rectArr: tempArr,
        }),
        () => funct(sortedIDX, checkingIDX + 1, selectedIDX)
      );
    }
  };

  clock = (sortedIDX, checkingIDX, selectedIDX, funct) => {
    const { sortingSpeed, isExecutingSort } = this.props;
    if (isExecutingSort)
      setTimeout(() => {
        if (isExecutingSort) funct();
        else
          this.setState({
            sortingProgress: [sortedIDX, checkingIDX, selectedIDX],
            isSorting: false,
          });
      }, sortingSpeed);
    else
      this.setState({
        sortingProgress: [sortedIDX, checkingIDX, selectedIDX],
        isSorting: false,
      });
  };
}

export default SelectionSort;

const selectionSort = (arr, compare) => {
  const tempArr = arr.slice();
  for (let i = 0; i < tempArr.length; i++) {
    let selectedIDX = i;

    for (let j = i + 1; j < tempArr.length; j++) {
      if (compare(tempArr[selectedIDX], tempArr[j])) {
        selectedIDX = j;
      }
    }
    if (selectedIDX !== i) {
      [tempArr[i], tempArr[selectedIDX]] = [tempArr[selectedIDX], tempArr[i]];
    }
  }
  return tempArr;
};
