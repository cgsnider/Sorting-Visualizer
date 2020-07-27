import React, { PureComponent } from "react";
import "../stylings/SelectionBar.css";
import "../stylings/Default.css";
import { selectionSort } from "./SortingButtons";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Divider,
  ButtonGroup,
  Slider,
  Grid,
  Box,
} from "@material-ui/core";

class OptionBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortingOptions: ["Selection", "Insertion", "Merge", "Quick", "Boggo"],
    };
  }

  render() {
    const {
      setSortingMethod,
      toggleExecutingSort,
      isExecutingSort,
      toggleResetArr,
      arrConstraints,
      sortingSpeedConstraints,
    } = this.props;
    const { minLen, maxLen, defaultLen } = arrConstraints;
    const { slowest, fastest, defaultSpeed } = sortingSpeedConstraints;
    const { sortingOptions } = this.state;
    return (
      <>
        <AppBar position="sticky">
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <Button onClick={toggleExecutingSort}>
              <Typography>{isExecutingSort ? "Pause" : "Play"}</Typography>
            </Button>

            <Divider color="secondary" orientation="vertical" flexItem />

            <ButtonGroup variant="text" disabled={isExecutingSort}>
              {sortingOptions.map((opt, id) => (
                <Button
                  key={id}
                  onClick={() => setSortingMethod(opt.toLowerCase())}
                >
                  <Typography>{opt}</Typography>
                </Button>
              ))}
            </ButtonGroup>

            <Divider color="secondary" orientation="vertical" flexItem />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="12.5%"
            >
              <Typography>Array Size</Typography>

              <Slider
                onChange={this.lenSliderHandler}
                disabled={isExecutingSort}
                color="secondary"
                marks={true}
                min={minLen}
                max={maxLen}
                step={1}
                defaultValue={defaultLen}
              ></Slider>
            </Box>

            <Divider color="secondary" orientation="vertical" flexItem />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="12.5%"
            >
              <Typography>Sorting Speed</Typography>

              <Slider
                color="secondary"
                marks={true}
                disabled={isExecutingSort}
                max={fastest}
                min={slowest}
                step={1}
                defaultValue={defaultSpeed}
                onChange={this.speedSliderHandler}
              ></Slider>
            </Box>

            <Divider color="secondary" orientation="vertical" flexItem />

            <Button onClick={toggleResetArr} disabled={isExecutingSort}>
              <Typography>Reset Array</Typography>
            </Button>
          </Box>
        </AppBar>
      </>
    );
  }

  speedSliderHandler = (event, newValue) => {
    this.props.setSpeed(newValue);
  };
  lenSliderHandler = (event, newValue) => this.props.setArrLen(newValue);
}

export default OptionBar;
