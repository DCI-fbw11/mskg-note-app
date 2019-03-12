import React from "react";

const ColorPicker = props => {
  const colors = [
    "white",
    "#F4F4D8",
    "#E8C384",
    "#DFE56C",
    "#D6C621",
    "#A4635F"
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
