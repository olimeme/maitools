import { IconButton, Stack } from "@chakra-ui/react";
import React, { MouseEvent, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import { ElementTypes } from "./ElementTypes";
import { ElementCoordinates } from "./ElementCoordinates";
import { Element } from "./Element";
import useCommandHistory from "../../hooks/useCommandHistory";
import { Drawable } from "roughjs/bin/core";
import { Position } from "./Positions";
import { FaEraser, FaHandPaper, FaPenFancy, FaRegSquare } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";

import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

const generator = rough.generator();

const Canvas = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState<ElementTypes>("line");
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const { registerAction } = useCommandHistory();
  const { changeColorBasedOnTheme } = useDarkModeChecker();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }: { roughElement: Drawable }) =>
      roughCanvas.draw(roughElement)
    );
  }, [elements]);

  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  const nearPoint = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    name: string
  ) => {
    return Math.abs(x - x1) < 10 && Math.abs(y - y1) < 10 ? name : null;
  };

  const isWithinLine = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  };

  const isWithinRectangle = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  };

  const isWithinCircle = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number
  ) => {
    const distanceFromCenter = Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
    const withinCircle = distanceFromCenter <= x2;
    return withinCircle;
  };

  const positionWithinElement = (x: number, y: number, element: Element) => {
    const { type, x1, x2, y1, y2 } = element;
    switch (type) {
      case "line":
        return isWithinLine(x, y, x1, y1, x2, y2);
      case "rectangle":
        return isWithinRectangle(x, y, x1, y1, x2, y2);
      case "circle":
        return isWithinCircle(x, y, x1, y1, x2);
      default:
        break;
    }
  };

  const adjustElementCoodrinates = (element: Element): ElementCoordinates => {
    const { type, x1, y1, x2, y2 } = element;
    switch (type) {
      case "rectangle":
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return { x1: minX, y1: minY, x2: maxX, y2: maxY };
      case "line":
        if (x1 < x2 || (x1 === x2 && y1 < y2)) {
          return { x1, y1, x2, y2 };
        } else {
          return { x1: x2, y1: y2, x2: x1, y2: y1 };
        }
      default:
        return { x1, y1, x2, y2 };
    }
  };

  const cursorForPosition = (element: Element): string => {
    switch (element.position) {
      case "tl":
      case "br":
      case "tr":
      case "bl":
        return "nesw-resize";
      case "start":
      case "end":
        return "nesw-resize";
      default:
        return "move";
    }
  };

  const resizedCoordinates = (
    clientX: number,
    clientY: number,
    position: Position,
    coordinates: { x1: number; y1: number; x2: number; y2: number }
  ) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
      case "tl":
        return { x1: clientX, y1: clientY, x2, y2 };
      case "tr":
        return { x1, y1: clientY, x2: clientX, y2 };
      case "bl":
        return { x1: clientX, y1, x2, y2: clientY };
      case "br":
        return { x1, y1, x2: clientX, y2: clientY };
      case "start":
        return { x1: clientX, y1: clientY, x2, y2 };
      case "end":
        return { x1, y1, x2: clientX, y2: clientY };
      default:
        return { x1, y1, x2, y2 };
    }
  };

  const createCanvasElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: ElementTypes
  ): Element => {
    let roughElement;
    switch (type) {
      case "line":
        roughElement = generator.line(x1, y1, x2, y2, {
          stroke: "grey",
        });
        break;
      case "rectangle":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
          stroke: "grey",
        });
        break;
      // case "circle":
      //   roughElement = generator.circle(x1, y1, x2 - x1 || y2 - y1, { stroke: colorMode === "dark" ? "white" : "black"});
      //   break;
      default:
        roughElement = generator.line(x1, y1, x2, y2, {
          stroke: "grey",
        });
        break;
    }
    return {
      id,
      type,
      x1,
      y1,
      x2,
      y2,
      position: null,
      roughElement,
      offsetX: 0,
      offsetY: 0,
    };
  };

  const getElementAtPosition = (x: number, y: number, elements: Element[]) => {
    return elements
      .map((element) => ({
        ...element,
        position: positionWithinElement(x, y, element),
      }))
      .find((element) => element.position !== null);
  };

  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: ElementTypes
  ) => {
    const updatedElement = createCanvasElement(id, x1, y1, x2, y2, type);

    const elementCopy = [...elements];
    elementCopy[id] = updatedElement;
    setElements(elementCopy);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY } as Element);
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resize");
        }
      }
    } else {
      const id = elements.length;
      const element = createCanvasElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      setAction("drawing");
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (selectedElement === null) return;
    const index = selectedElement.id;
    const { id, type } = elements[index];
    if (action === "drawing" || action === "resize") {
      const { x1, y1, x2, y2 } = adjustElementCoodrinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type);

      //TODO: refactor
      registerAction(
        () => {
          const { x1, y1, x2, y2 } = adjustElementCoodrinates(elements[index]);
          updateElement(id, x1, y1, x2, y2, type);
        },
        () => {
          updateElement(
            id,
            selectedElement.x1,
            selectedElement.y1,
            selectedElement.x2,
            selectedElement.y2,
            type
          );
        }
      );
    }

    if (tool === "selection") {
      registerAction(
        () => {
          const { x1, y1, x2, y2 } = adjustElementCoodrinates(elements[index]);
          updateElement(id, x1, y1, x2, y2, type);
        },
        () => {
          updateElement(
            id,
            selectedElement.x1,
            selectedElement.y1,
            selectedElement.x2,
            selectedElement.y2,
            type
          );
        }
      );
    }
    setAction("none");
    setSelectedElement(null);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);

      if (!(event.target instanceof HTMLElement)) return;

      event.target.style!.cursor = element
        ? cursorForPosition(element as Element)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement!;

      const width = x2 - x1;
      const height = y2 - y1;
      const mousePosOnMoveX = clientX - offsetX;
      const mousePosOnMoveY = clientY - offsetY;
      updateElement(
        id,
        mousePosOnMoveX,
        mousePosOnMoveY,
        mousePosOnMoveX + width,
        mousePosOnMoveY + height,
        type
      );
    } else if (action === "resize") {
      const { id, type, position, ...coordinates } = selectedElement!;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleCurrentToolChange = (value: ElementTypes) => {
    setTool(value);
  };

  return (
    <>
      <Stack w={50} position={"absolute"} top={"30%"} m={4}>
        <IconButton
          aria-label="selection"
          icon={<FaHandPaper />}
          onClick={() => handleCurrentToolChange("selection")}
        />
        <IconButton
          aria-label="line"
          icon={<SlGraph />}
          onClick={() => handleCurrentToolChange("line")}
        />
        <IconButton
          aria-label="rectangle"
          icon={<FaRegSquare />}
          onClick={() => handleCurrentToolChange("rectangle")}
        />
        <IconButton
          aria-label="pencil"
          icon={<FaPenFancy />}
          onClick={() => handleCurrentToolChange("pencil")}
        />
        <IconButton
          aria-label="eraser"
          icon={<FaEraser />}
          onClick={() => handleCurrentToolChange("eraser")}
        />
      </Stack>
      {/* <HStack w={50} position={"absolute"} bottom={"1%"} m={4}>
        <IconButton
          aria-label="undo"
          icon={<FaUndo />}
          onClick={() => handleUndo()}
        />
        <IconButton
          aria-label="redo"
          icon={<FaRedo />}
          onClick={() => handleRedo()}
        />
      </HStack> */}
      <canvas
        id="canvas"
        height={window.innerHeight}
        width={window.innerWidth}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </>
  );
};

export default Canvas;
