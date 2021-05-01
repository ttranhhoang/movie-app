import React, { useState } from "react";

const getNewColor = () => {
  const color = ["green", "black", "blue", "yellow"];
  const random = Math.trunc(Math.random() * 4);
  return color[random];
};
function Nav() {
  const [color, setColor] = useState(["red"]);
  const handleClick = () => {
    const newColor = getNewColor;
    setColor(newColor);
    
  };
  return (
    <div
      className="color__box"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
     COLOR
    </div>
  );
}

export default Nav;
