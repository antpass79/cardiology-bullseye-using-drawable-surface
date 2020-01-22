import { Point } from "./point";
import { Transform } from '../shapes/transform';
import { EventManager } from "../event-aggregator/event-manager";
import { Appearance } from "./appearance";
import { Status } from "./status";
import { Rect } from "./rect";

export interface ISurface {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    transform: Transform
}

export interface IShape {
    readonly status: Status;
    readonly appearance: Appearance;

    draw(surface: ISurface);

    mouseMove(surface: ISurface, e: MouseEvent);
    mouseClick(surface: ISurface, e: MouseEvent);
    mouseDoubleClick(surface: ISurface, e: MouseEvent);
    mouseDown(surface: ISurface, e: MouseEvent);
    mouseUp(surface: ISurface, e: MouseEvent);
    mouseEnter(surface: ISurface, e: MouseEvent);
    mouseLeave(surface: ISurface, e: MouseEvent);
    mouseOver(surface: ISurface, e: MouseEvent);
    mouseWheel(surface: ISurface, e: MouseWheelEvent);

    isPointInside(surface: ISurface, point: Point): boolean;
    getGhost(): Rect;
}

export abstract class Shape implements IShape {
    private _status = Status.default();;
    get status(): Status {
        return this._status;
    }

    private _appearance = Appearance.default();;
    get appearance(): Appearance {
        return this._appearance;
    }

    draw(surface: ISurface) {
        this.prepareSurface(surface);
        this.drawSurface(surface);
        this.completeSurface(surface);
    }

    mouseMove(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseMove", { eventName: "shapeMouseMove", shape: this, mouseEvent: e });
    }

    mouseClick(surface: ISurface, e: MouseEvent) {
        this.status.selected = !this.status.selected;
        EventManager.getInstance().publish("shapeMouseClick", { eventName: "shapeMouseClick", shape: this, mouseEvent: e });
    }

    mouseDoubleClick(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseDoubleClick", { eventName: "shapeMouseDoubleClick", shape: this, mouseEvent: e });
    }

    mouseDown(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseDown", { eventName: "shapeMouseDown", shape: this, mouseEvent: e });
    }

    mouseUp(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseUp", { eventName: "shapeMouseUp", shape: this, mouseEvent: e });
    }

    mouseEnter(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseEnter", { eventName: "shapeMouseEnter", shape: this, mouseEvent: e });
    }

    mouseLeave(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseLeave", { eventName: "shapeMouseLeave", shape: this, mouseEvent: e });
    }

    mouseOver(surface: ISurface, e: MouseEvent) {
        EventManager.getInstance().publish("shapeMouseOver", { eventName: "shapeMouseOver", shape: this, mouseEvent: e });
    }

    mouseWheel(surface: ISurface, e: MouseWheelEvent) {
        EventManager.getInstance().publish("shapeMouseWheel", { eventName: "shapeMouseWheel", shape: this, mouseEvent: e });
    }

    isPointInside(surface: ISurface, point: Point): boolean {
        this.draw(surface);
        return surface.context.isPointInPath(point.X, point.Y);
    }

    abstract getGhost(): Rect;

    protected prepareSurface(surface: ISurface) {
        this.appearance.update(this.status);
    }

    protected drawSurface(surface: ISurface) {
    }

    protected completeSurface(surface: ISurface) {
    }
}

export class CompositeShape extends Shape {
    private _shapes: IShape[] = [];
    get shapes(): IShape[] {
        return this._shapes;
    }

    getGhost(): Rect {
        return this.shapes.map(shape => shape.getGhost()).reduce((ghost1, ghost2) => {
            return {
                X1: Math.min(ghost1.X1, ghost2.X1),
                Y1: Math.min(ghost1.Y1, ghost2.Y1),
                X2: Math.max(ghost1.X2, ghost2.X2),
                Y2: Math.max(ghost1.Y2, ghost2.Y2),
            }
        })
    }

    protected prepareSurface(surface: ISurface) {
        super.prepareSurface(surface);

        surface.context.beginPath();
        surface.context.lineWidth = this.appearance.lineWidth;
        surface.context.strokeStyle = this.appearance.strokeStyle;
        surface.context.fillStyle = this.appearance.fill;
    }

    protected drawSurface(surface: ISurface) {
        this.shapes.forEach((shape: IShape) => { shape.draw(surface) });
    }

    protected completeSurface(surface: ISurface) {
        surface.context.closePath();
        surface.context.stroke();
        surface.context.fill();
    }
}