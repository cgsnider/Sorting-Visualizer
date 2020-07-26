import React, { PureComponent } from "react";
import "../stylings/SelectionBar.css";
import "../stylings/Default.css";
import { selectionSort } from "./SortingButtons";

class OptionBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        //new Option(name, is_a_sorting_method)
        new Option("Selection", true),
        new Option("Insertion", true),
        new Option("Merge", true),
        new Option("Quick", true),
        new Option("Boggo", true),
        new Option("Play", false),
      ],
    };
  }

  optionHandler = (newStatus, buttonIDX) => {
    this.updateOptions(newStatus, buttonIDX);
    this.updatesApp(newStatus, buttonIDX);
  };

  updatesApp = (newStatus, buttonIDX) => {
    const { setSortingMethod, toggleExecutingSort } = this.props;
    if (newStatus == "click") {
      if (this.state.options[buttonIDX].name !== "Play") {
        setSortingMethod(this.state.options[buttonIDX].name.toLowerCase());
      } else {
        toggleExecutingSort();
      }
    }
  };

  updateOptions = (newStatus, buttonIDX) => {
    const optionsTemp = this.state.options.slice();
    optionsTemp[buttonIDX] = new Option(
      optionsTemp[buttonIDX].name,
      optionsTemp[buttonIDX].isSorting,
      newStatus
    );
    this.setState({ options: optionsTemp });
  };

  render() {
    const { arr, setSortingMethod } = this.props;
    const { options } = this.state;

    return (
      <ul
        className="bar"
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {options.map((opt, id) => (
          <button
            key={id}
            onMouseDown={() => this.optionHandler("click", id)}
            onMouseUp={() => this.optionHandler("hover", id)}
            onMouseOver={() => this.optionHandler("hover", id)}
            onMouseLeave={() => this.optionHandler("norm", id)}
            className={options[id].status}
            style={{ margin: "10px" }}
          >
            {options[id].name}
          </button>
        ))}
      </ul>
    );
  }
}

class Option {
  constructor(name, isSorting, newStatus) {
    this.name = name;
    this.status = newStatus ? newStatus : "norm";
    this.isSorting = isSorting;
  }
}

export default OptionBar;
