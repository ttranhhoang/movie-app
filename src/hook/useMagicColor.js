import { useEffect, useRef, useState } from "react";

const randomColor = (current) => {
  const colorList = ["red", "black", "white", "green"];

  const currentColor = colorList.indexOf(current);
  let newIndex = currentColor;
  while (currentColor === newIndex) {
    newIndex = Math.trunc(Math.random() * 4);
  }

  return colorList[newIndex];
};
function useMagicColor() {
  const [color, setColor] = useState("transparent");
  const colorRef = useRef("transparent");

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const colorChange = randomColor(colorRef.current);
      console.log("colorChange", colorChange);
      setColor(colorChange);

      colorRef.current = colorChange;
    }, 1000);
    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  return { color };
}

export default useMagicColor;
