import React, { PureComponent } from "react";
import RectangleCanvas from "./components/RectangleCanvas";
import OptionBar from "./components/OptionBar";
import "./stylings/Default.css";

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortingOptions: ["Selection", "Insertion", "Merge"],
      arrConstraints: {
        minLen: 4,
        maxLen: 100,
        defaultLen: 10,
      },
      arrLen: 10,
      sortingSpeedConstraints: {
        slowest: 0,
        fastest: 2000,
        speedBase: 2000,
        defaultSpeed: 1000,
      },
      sortingSpeed: 1000,
      sortingMethod: 0,
      isExecutingSort: false,
      resetArr: false,
      updated: true,
    };
  }

  render() {
    const {
      arrLen,
      isExecutingSort,
      sortingMethod,
      resetArr,
      arrConstraints,
      sortingSpeedConstraints,
      sortingSpeed,
      sortingOptions,
      updated,
      isUpdated,
    } = this.state;
    return (
      <div style={{ backgroundColor: "#323232" }}>
        <OptionBar
          arrConstraints={arrConstraints}
          setSortingMethod={this.setSortingMethod}
          toggleExecutingSort={this.toggleExecutingSort}
          isExecutingSort={isExecutingSort}
          toggleResetArr={this.toggleResetArr}
          setArrLen={this.setArrLen}
          sortingSpeedConstraints={sortingSpeedConstraints}
          setSpeed={this.setSpeed}
          sortingOptions={sortingOptions}
        />
        <RectangleCanvas
          isUpdated={this.isUpdated}
          updated={updated}
          sortingOptions={sortingOptions}
          arrLen={arrLen}
          isExecutingSort={isExecutingSort}
          sortingMethod={sortingMethod}
          resetArr={resetArr}
          toggleResetArr={this.toggleResetArr}
          toggleExecutingSort={this.toggleExecutingSort}
          sortingSpeed={sortingSpeed}
        />
      </div>
    );
  }

  /** Non-Lifecycle Methods */

  isUpdated = (update) => this.setState({ updated: update });

  setSortingMethod = (method) =>
    this.setState({ sortingMethod: method, updated: false });

  toggleExecutingSort = () => {
    this.setState({
      isExecutingSort: !this.state.isExecutingSort,
      updated: false,
    });
  };

  toggleResetArr = (funct) =>
    this.setState({ resetArr: !this.state.resetArr, updated: false }, funct);

  setArrLen = (newLen) => this.setState({ arrLen: newLen, updated: false });

  setSpeed = (newSpeed) => {
    // console.log(this.state.sortingSpeedConstraints.speedBase - newSpeed);
    this.setState({
      sortingSpeed: this.state.sortingSpeedConstraints.speedBase - newSpeed,
      updated: false,
    });
  };
}

export default App;
