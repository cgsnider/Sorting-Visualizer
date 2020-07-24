import React, { PureComponent } from "react";
import RectangleCanvas from "./components/RectangleCanvas";
import OptionBar from "./components/OptionBar";
import "./stylings/Default.css";

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      min: 150,
      max: 300,
      arrLen: 20,
      arrMinLen: 4,
      arrMaxLen: 100,
      newId: 0,
      sortingMethod: null,
      executingSort: false,
    };
  }

  setSortingMethod = (method) => this.setState({ sortingMethod: method });

  toggleExecutingSort = () =>
    this.setState({ executingSort: !this.state.executingSort });

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const { arrLen } = this.state;
    let arrTemp = [];
    for (let i = 0; i < arrLen; i++) {
      arrTemp.push(this.generateElem());
    }
    this.setState({
      arr: arrTemp,
    });
  };

  generateElem = () => {
    const { max, min, newId } = this.state;
    let elem = new Elem(
      Math.floor(Math.random() * (max - min + 1) + min),
      Number.MAX_SAFE_INTEGER * Math.random()
    );
    return elem;
  };

  render() {
    const { arr } = this.state;
    return (
      <div className="App">
        <OptionBar
          arr={arr}
          setSortingMethod={this.setSortingMethod}
          toggleExecutingSort={this.toggleExecutingSort}
        />
        <RectangleCanvas arr={arr} />
      </div>
    );
  }
}

class Elem {
  constructor(value, id) {
    this.value = value;
    this.id = id;
  }
}

export default App;
