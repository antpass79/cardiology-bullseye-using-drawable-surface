import { Point } from "../shapes/point";
import { IMouseHandlerContext } from "./mouse-handler-context";
import { IShape } from "../shapes/shape";
import { MouseService } from "../services/mouse.service";
import { EventEmitter } from "@angular/core";
import { ShapeEvent, ShapeWheelEvent } from "./shape-events";

export interface IMouseHandler {
    mouseMoveChange: EventEmitter<ShapeEvent>;
    mouseClickChange: EventEmitter<ShapeEvent>;
    mouseDoubleClickChange: EventEmitter<ShapeEvent>;
    mouseDownChange: EventEmitter<ShapeEvent>;
    mouseUpChange: EventEmitter<ShapeEvent>;
    mouseEnterChange: EventEmitter<ShapeEvent>;
    mouseLeaveChange: EventEmitter<ShapeEvent>;
    mouseOverChange: EventEmitter<ShapeEvent>;
    mouseWheelChange: EventEmitter<ShapeWheelEvent>;

    mouseMove(mouseHandlerContext: IMouseHandlerContext);
    mouseClick(mouseHandlerContext: IMouseHandlerContext);
    mouseDoubleClick(mouseHandlerContext: IMouseHandlerContext);
    mouseDown(mouseHandlerContext: IMouseHandlerContext);
    mouseUp(mouseHandlerContext: IMouseHandlerContext);
    mouseEnter(mouseHandlerContext: IMouseHandlerContext);
    mouseLeave(mouseHandlerContext: IMouseHandlerContext);
    mouseOver(mouseHandlerContext: IMouseHandlerContext);
    mouseWheel(mouseHandlerContext: IMouseHandlerContext);

    isPointInside(mouseHandlerContext: IMouseHandlerContext, point: Point): boolean;
}

export class MouseHandler implements IMouseHandler {
    mouseMoveChange = new EventEmitter<ShapeEvent>();
    mouseClickChange = new EventEmitter<ShapeEvent>();
    mouseDoubleClickChange = new EventEmitter<ShapeEvent>();
    mouseDownChange = new EventEmitter<ShapeEvent>();
    mouseUpChange = new EventEmitter<ShapeEvent>();
    mouseEnterChange = new EventEmitter<ShapeEvent>();
    mouseLeaveChange = new EventEmitter<ShapeEvent>();
    mouseOverChange = new EventEmitter<ShapeEvent>();
    mouseWheelChange = new EventEmitter<ShapeWheelEvent>();

    mouseMove(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseMoveChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseClick(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseClickChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseDoubleClick(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseDoubleClickChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseDown(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseDownChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseUp(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseUpChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseEnter(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseEnterChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseLeave(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseLeaveChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseOver(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseOverChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent
            });
        }
    }

    mouseWheel(mouseHandlerContext: IMouseHandlerContext) {
        mouseHandlerContext.mouseEvent.preventDefault();

        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            this.mouseWheelChange.emit({
                shape: shape,
                mouseEvent: mouseHandlerContext.mouseEvent as MouseWheelEvent
            });
        }
    }

    isPointInside(mouseHandlerContext: IMouseHandlerContext, point: Point): boolean {
        let shape = this.getSelectedShape(mouseHandlerContext);
        if (shape) {
            let renderer = mouseHandlerContext.rendererContext.rendererCache.get(shape.type);
            return renderer.isPointInside({
                rendererCache: mouseHandlerContext.rendererContext.rendererCache,
                surface: mouseHandlerContext.rendererContext.surface,
                state: mouseHandlerContext.rendererContext.state
            }, shape, point);
        }

        return false;
    }

    private getSelectedShape(mouseHandlerContext: IMouseHandlerContext): IShape {
        let point = MouseService.getPosition(mouseHandlerContext.rendererContext.surface.canvas, mouseHandlerContext.mouseEvent);
        let selectedShapes = mouseHandlerContext.rendererContext.state.picture.shapes.filter((shape) => {
            let renderer = mouseHandlerContext.rendererContext.rendererCache.get(shape.type);
            return renderer.isPointInside({
                rendererCache: mouseHandlerContext.rendererContext.rendererCache,
                surface: mouseHandlerContext.rendererContext.surface,
                state: mouseHandlerContext.rendererContext.state
            }, shape, point);
        });

        return selectedShapes && selectedShapes.length === 1 ? selectedShapes[0] : null;
    }
}