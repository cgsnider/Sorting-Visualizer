import React from "react";
import Rectangle from "./Rectangle";

function RectangleCanvas({ arr }) {
  return (
    <>
      <ul>
        {arr.map((elem) => (
          <li key={elem.id}>
            <Rectangle width={20} height={elem.value} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default RectangleCanvas;
