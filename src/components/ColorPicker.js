import React from "react";
import { OverlayTrigger, Button, Popover } from "react-bootstrap";

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
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={
        <Popover title="Please pick a color: ">
          <div style={{ width: "fit-content" }}>
            {colors.map((color, i) => {
              return (
                <i
                  className="fas fa-paint-brush color-pick col"
                  key={i}
                  onClick={() => props.changeColor(color)}
                  style={{ color: color, width: "20%", padding: "0.4em" }}
                />
              );
            })}
          </div>
        </Popover>
      }
    >
      <Button variant="dark">
        <i
          className="fas fa-palette"
          style={{
            color: props.color,
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
          }}
        />
      </Button>
    </OverlayTrigger>
  );
};

export default ColorPicker;
