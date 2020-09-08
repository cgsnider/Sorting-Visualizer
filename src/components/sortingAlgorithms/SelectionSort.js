import React, { Component } from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import Rectangle from "../Rectangle";

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
    const { isExecutingSort } = this.props;
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
