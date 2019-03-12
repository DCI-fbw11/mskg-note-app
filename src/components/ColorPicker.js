import React from "react";

const ColorPicker = props => {
  const colors = [
    "white",
    "#F28B82",
    "#FFF4B1",
    "#CCFF90",
    "#A7FFEB",
    "#D7AEFB",
    "#FDCFE8"
  ];

  return (
    <div className="row">
      {colors.map((color, i) => {
        return (
          <i
            className="fas fa-paint-brush color-pick col"
            key={i}
            onClick={() => props.changeColor(color)}
            style={{ color: color, width: "20%" }}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
