import { Drawable } from "roughjs/bin/core";
import { ElementCoordinates } from "./ElementCoordinates";
import { ElementTypes } from "./ElementTypes";
import { Position } from "./Positions";
import { Offset } from "./Offset";

export type Element =
  | ElementCoordinates & {
      id: number;
      type: ElementTypes;
      position: Position;
      roughElement: Drawable;
      offsetX: number;
      offsetY: number;
    };
