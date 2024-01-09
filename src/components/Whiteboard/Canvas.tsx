import React, { createElement, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const generator = rough.generator();
const NAVBAR_OFFSET = 90;

const Canvas = () => {
  const [elements, setElements] = useState<any[]>([]);
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }: any) => roughCanvas.draw(roughElement));
  }, [elements]);

  const createCanvasElement = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
      stroke: "white",
    });
    return { x1, y1, x2, y2, roughElement };
    // setElement([...element, roughElement]);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setDrawing(true);

    const { clientX, clientY } = event;
    const element = createCanvasElement(
      clientX,
      clientY - NAVBAR_OFFSET,
      clientX,
      clientY - NAVBAR_OFFSET
    );
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setDrawing(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createCanvasElement(
      x1,
      y1,
      clientX,
      clientY - NAVBAR_OFFSET
    );

    const elementCopy = [...elements];
    elementCopy[index] = updatedElement;
    setElements(elementCopy);
  };

  return (
    <canvas
      id="canvas"
      style={{ backgroundColor: "#363636" }}
      height={window.innerHeight}
      width={window.innerWidth}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    ></canvas>
  );
};

export default Canvas;
