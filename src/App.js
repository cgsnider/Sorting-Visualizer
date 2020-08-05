import React, { PureComponent } from "react";
import RectangleCanvas from "./components/RectangleCanvas";
import OptionBar from "./components/OptionBar";
import "./stylings/Default.css";

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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
      sortingMethod: null,
      isExecutingSort: false,
      resetArr: false,
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
        />
        <RectangleCanvas
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

  setSortingMethod = (method) => this.setState({ sortingMethod: method });

  toggleExecutingSort = () => {
    this.setState({ isExecutingSort: !this.state.isExecutingSort });
  };

  toggleResetArr = () => this.setState({ resetArr: !this.state.resetArr });

  setArrLen = (newLen) => this.setState({ arrLen: newLen });

  setSpeed = (newSpeed) => {
    console.log(this.state.sortingSpeedConstraints.speedBase - newSpeed);
    this.setState({
      sortingSpeed: this.state.sortingSpeedConstraints.speedBase - newSpeed,
    });
  };
}

export default App;
