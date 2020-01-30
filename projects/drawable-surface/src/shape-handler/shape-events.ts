import { IShape } from "../shapes/shape";

export interface ShapeEvent {
    shape: IShape,
    mouseEvent: MouseEvent
};

export interface ShapeWheelEvent {
    shape: IShape,
    mouseEvent: MouseWheelEvent
};
