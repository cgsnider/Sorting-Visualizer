import React from "react";
import RectangleCanvas from "./components/RectangleCanvas";
import SelectionBar from "./components/SelectionBar";

function App() {
  return (
    <div className="App">
      <SelectionBar />
      <RectangleCanvas />
    </div>
  );
}

export default App;
