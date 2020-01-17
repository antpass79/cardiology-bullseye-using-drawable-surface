import { EventManager } from '../event-aggregator/event-manager';

import { IShape, Shape, ISurface } from './shape';
import { Point } from "./point";

export class Segment extends Shape {
	private _parts: IShape[] = [];
	get parts(): IShape[] {
		return this._parts;
	}

	isMouseOver: boolean = false;

	isPointInPath(surface: ISurface, point: Point): boolean {
		surface.context.beginPath();
		this.parts.forEach((part: IShape) => { part.draw(surface) });
		surface.context.closePath();

		return surface.context.isPointInPath(point.X, point.Y);
	}

	draw(surface: ISurface) {
		surface.context.beginPath();

		this.parts.forEach((part: IShape) => { part.draw(surface) });

		surface.context.closePath();
		surface.context.stroke();
		surface.context.fill();
	}

	mouseMove(surface: ISurface, e: MouseEvent) {
	}

	mouseClick(surface: ISurface, e: MouseEvent) {
		EventManager.getInstance().publish("segmentMouseClick", { eventName: "segmentMouseClick", segment: this, mouseEvent: e });
	}

	mouseUp(surface: ISurface, e: MouseEvent) {
		surface.canvas.getContext('2d').fillStyle = 'blue';
	}

	mouseEnter(surface: ISurface, e: MouseEvent) {
		this.isMouseOver = true;
	}

	mouseLeave(surface: ISurface, e: MouseEvent) {
		this.isMouseOver = false;
	}

	mouseWheel(surface: ISurface, e: MouseWheelEvent) {
		EventManager.getInstance().publish("segmentMouseWheel", { eventName: "segmentMouseWheel", segment: this, mouseEvent: e });
	}
}