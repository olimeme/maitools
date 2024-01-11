import { ElementCoordinates } from "./ElementCoordinates";
import { ElementTypes } from "./ElementTypes";

export type Element = ElementCoordinates & {
  id: number;
  type: ElementTypes;
};
