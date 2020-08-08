import React, { PureComponent } from "react";
import { Box } from "@material-ui/core";
import Rectangle from "../Rectangle";

export class InsertionSort extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rectArr: [],
      isSorting: false,
      sortingProgress: [1, 0],
      doneInsert: -1,
      colors: {
        unsorted: "maroon",
        sorted: "mediumSeaGreen",
        selected: "goldenRod",
      },
    };
  }

  componentDidMount() {
    this.setState({ rectArr: this.props.rectangleArr });
  }

  componentDidUpdate() {
    const { isSorting } = this.state;
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

  sort = () => {
    const { sortingProgress, colors, rectArr } = this.state;
    const [sortedIDX, insertIDX] = sortingProgress;
    const tempArr = rectArr.slice();
    tempArr[0].setOutlineColor(colors.sorted);
    this.setState({ rectArr: tempArr, isSorting: true }, () =>
      this.continueSort(sortedIDX, insertIDX)
    );
  };

  continueSort = (sortedIDX, insertIDX, bypassClock) => {
    this.clock(
      sortedIDX,
      insertIDX,
      () => {
        const { rectArr } = this.state;
        if (sortedIDX > rectArr.length) {
          this.endSort();
        } else if (insertIDX === sortedIDX) {
          this.beginInsert(sortedIDX, insertIDX, this.continueSort);
        } else if (insertIDX > 0) {
          this.continueInsert(sortedIDX, insertIDX, this.continueSort);
        } else if (insertIDX <= 0) {
          this.endInsert(sortedIDX, insertIDX, this.continueSort);
        }
      },
      bypassClock
    );
  };

  endSort = () => {
    this.props.toggleExecutingSort();
    this.setState({ isSorting: false });
  };

  beginInsert = (sortedIDX, insertIDX, funct) => {
    const { rectArr, colors } = this.state;
    const tempArr = rectArr.slice();
    tempArr[insertIDX - 1].setOutlineColor(colors.selected);
    this.setState({ rectArr: tempArr }, () => funct(sortedIDX, sortedIDX - 1));
  };

  continueInsert = (sortedIDX, insertIDX, funct) => {
    const { rectArr, doneInsert, colors } = this.state;
    const tempArr = rectArr.slice();
    if (Rectangle.compare(tempArr[insertIDX - 1], tempArr[insertIDX])) {
      [tempArr[insertIDX], tempArr[insertIDX - 1]] = [
        tempArr[insertIDX - 1],
        tempArr[insertIDX],
      ];
      this.setState({ rectArr: tempArr }, () =>
        funct(sortedIDX, insertIDX - 1)
      );
    } else {
      tempArr[insertIDX].setOutlineColor(colors.sorted);
      this.setState({ rectArr: tempArr }, () => funct(sortedIDX, doneInsert));
    }
  };

  endInsert = (sortedIDX, insertIDX, funct) => {
    const { rectArr, colors } = this.state;
    const tempArr = rectArr.slice();
    if (insertIDX === 0) {
      tempArr[insertIDX].setOutlineColor(colors.sorted);
      this.setState({ rectArr: tempArr }, () =>
        funct(sortedIDX + 1, sortedIDX + 1)
      );
    } else funct(sortedIDX + 1, sortedIDX + 1, true);
  };

  clock = (sortedIDX, insertIDX, funct, bypassClock) => {
    const { sortingSpeed, isExecutingSort } = this.props;
    if (isExecutingSort && !bypassClock)
      setTimeout(() => {
        if (isExecutingSort) funct();
        else
          this.setState({
            sortingProgress: [sortedIDX, insertIDX],
            isSorting: false,
          });
      }, sortingSpeed);
    else if (bypassClock) funct();
    else
      this.setState({
        sortingProgress: [sortedIDX, insertIDX],
        isSorting: false,
      });
  };
}

export default InsertionSort;
