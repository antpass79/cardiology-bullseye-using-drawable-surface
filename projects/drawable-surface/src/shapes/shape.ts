import { Point } from "./point";
import { Transform } from '../shapes/transform';
import { EventManager } from "../event-aggregator/event-manager";
import { Appearance } from "./appearance";
import { Status } from "./status";

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
}

export class Shape implements IShape {
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
        surface.context.beginPath();
        this.draw(surface);
        surface.context.closePath();

        return surface.context.isPointInPath(point.X, point.Y);
    }

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

    isPointInside(surface: ISurface, point: Point): boolean {
        surface.context.beginPath();
        this.shapes.forEach((shape: IShape) => { shape.draw(surface) });
        surface.context.closePath();

        return surface.context.isPointInPath(point.X, point.Y);
    }

    protected prepareSurface(surface: ISurface) {
        super.prepareSurface(surface);

        surface.context.beginPath();
        surface.context.lineWidth = this.appearance.lineWidth;
        surface.context.strokeStyle = this.appearance.strokeStyle;
        surface.context.fillStyle = this.appearance.fill;
    }

    protected drawSurface(surface: ISurface) {
        this.shapes.forEach((part: IShape) => { part.draw(surface) });
    }

    protected completeSurface(surface: ISurface) {
        surface.context.closePath();
        surface.context.stroke();
        surface.context.fill();
    }
}