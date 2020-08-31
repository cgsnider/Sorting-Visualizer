import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Rectangle from "../../Rectangle";
import MergeTree from "./MergeTree";

export class MergeSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectArr: [],
      isSorting: false,
      colors: {
        unsorted: "maroon",
        sorted: "mediumSeaGreen",
        semiSorted: "LightSalmon",
        selectedRight: "goldenRod",
        selectedLeft: "gold",
      },
    };
  }

  componentDidMount() {
    this.setState({
      rectArr: this.props.rectangleArr,
      progress: [new MergeTree(this.props.rectangleArr), null],
    });
  }

  componentDidUpdate() {
    const { isSorting, rectArr } = this.state;
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
    const { progress } = this.state;
    this.setState({ isSorting: true }, () =>
      this.continueSort(progress[0], progress[1])
    );
  };

  continueSort = (mergeTree, indices) => {
    this.clock([mergeTree, indices], () => {
      const { toggleExecutingSort } = this.props;
      let tempArr = this.state.rectArr.slice();
      if (!indices) {
        indices = mergeTree.findMerge();
        if (!indices) {
          indices = mergeTree.grow();
          if (!indices) {
            toggleExecutingSort();
            this.setState({ isSorting: false });
          } else {
            const { subArrayIndex, endingIndex } = indices;
            const { red, green, blue } = mergeTree.newestStem.arrayColor;
            let newColor;
            console.log(mergeTree.newestStem.arrayColor);
            if (mergeTree.newestStem.parentNode.left == mergeTree.newestStem) {
              newColor = {
                red: red,
                green:
                  green +
                  (255 - Rectangle.getDefaultBgColor().green) /
                    (Math.log(tempArr.length) / Math.log(2)),
                blue: blue,
              };
              console.log(newColor, "left");
            } else {
              newColor = {
                red:
                  red +
                  (255 - Rectangle.getDefaultBgColor().red) /
                    (Math.log(tempArr.length) / Math.log(2)),
                green: green,
                blue: blue,
              };
              console.log(newColor, "right");
            }
            mergeTree.newestStem.arrayColor = newColor;
            for (let i = subArrayIndex; i < endingIndex; i++) {
              const { red, green, blue } = tempArr[i].getBgColor();
              tempArr[i].setBgColor(newColor);
            }
            this.setState({ rectArr: tempArr }, () =>
              this.continueSort(mergeTree)
            );
          }
        } else {
          const { subArrayIndex, endingIndex } = indices;
          const { colors } = this.state;
          let i = subArrayIndex;
          for (; i < (subArrayIndex + endingIndex) / 2; i++) {
            tempArr[i].setOutlineColor(colors.selectedLeft);
          }
          for (; i < endingIndex; i++) {
            tempArr[i].setOutlineColor(colors.selectedRight);
          }
          this.setState({ rectArr: tempArr }, () =>
            this.continueSort(mergeTree, indices)
          );
        }
      } else if (indices.isMergeDone) {
        const { subArrayIndex, endingIndex } = indices;
        const { colors } = this.state;
        for (let i = subArrayIndex; i < endingIndex; i++) {
          tempArr[i].setOutlineColor(colors.sorted);
          tempArr[i].setBgColor(mergeTree.mergingNode.arrayColor);
        }
        this.setState({ rectArr: tempArr }, () =>
          this.continueSort(mergeTree, null)
        );
      } else {
        const { sortedOldIdx, sortedNewIdx, isMergeDone } = mergeTree.autoMerge(
          Rectangle.compare
        );
        let tempRect = tempArr[sortedOldIdx];
        for (let i = sortedOldIdx; i > sortedNewIdx; i--) {
          tempArr[i] = tempArr[i - 1];
        }
        tempArr[sortedNewIdx] = tempRect;
        if (isMergeDone) indices.isMergeDone = true;
        this.setState({ rectArr: tempArr }, () =>
          this.continueSort(mergeTree, indices)
        );
      }
    });
  };

  clock = (progress, funct) => {
    const { sortingSpeed, isExecutingSort } = this.props;
    const { sortingProgress } = this.state;
    if (isExecutingSort) {
      setTimeout(() => {
        if (isExecutingSort) {
          funct();
        } else {
          this.setState({
            sortingProgress: progress,
            isSorting: false,
          });
        }
      }, sortingSpeed);
    } else {
      this.setState({
        sortingProgress: progress,
        isSorting: false,
      });
    }
  };
}

export default MergeSort;
