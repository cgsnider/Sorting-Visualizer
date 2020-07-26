import React, { PureComponent } from "react";
import RectangleCanvas from "./components/RectangleCanvas";
import OptionBar from "./components/OptionBar";
import "./stylings/Default.css";

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      arrLen: 30,
      arrMinLen: 4,
      arrMaxLen: 100,
      sortingMethod: null,
      isExecutingSort: false,
    };
  }

  /** Lifecycle Methods */

  render() {
    const { arrLen, isExecutingSort, sortingMethod } = this.state;
    return (
      <div className="App">
        <OptionBar
          setSortingMethod={this.setSortingMethod}
          toggleExecutingSort={this.toggleExecutingSort}
        />
        <RectangleCanvas
          arrLen={arrLen}
          isExecutingSort={isExecutingSort}
          sortingMethod={sortingMethod}
        />
      </div>
    );
  }

  /** Non-Lifecycle Methods */

  setSortingMethod = (method) => this.setState({ sortingMethod: method });

  toggleExecutingSort = () => {
    const { isExecutingSort } = this.state;
    this.setState({ isExecutingSort: !isExecutingSort });
  };
}

export default App;
