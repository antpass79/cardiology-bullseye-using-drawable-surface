import { EventManager } from './../../../event-aggregator/event-manager';

import { Shape } from './shape';
import { SegmentPart } from './segment-part';
import { Point } from './point';

export class Segment extends Shape {

	fill: string = 'transparent';
	parts: Array<SegmentPart> = new Array<SegmentPart>();

	isMouseOver: boolean = false;

	isPointInPath(canvas: any, context: any, point: Point): boolean {
		context.beginPath();
		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });
		context.closePath();

		return context.isPointInPath(point.x, point.y);
	}

	draw(canvas: any, context: any) {
		context.beginPath();
		context.fillStyle = this.fill;

		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });

		context.closePath();
		context.stroke();
		context.fill();
	}

	mouseMove(canvas: any, e: MouseEvent) {
	}

	mouseEnter(canvas: any, e: MouseEvent) {
		this.isMouseOver = true;
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseLeave(canvas: any, e: MouseEvent) {
		this.isMouseOver = false;
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseUp(canvas: any, e: MouseEvent) {
		canvas.getContext('2d').fillStyle = 'blue';
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseWheel(canvas: any, e: MouseWheelEvent) {
		this.draw(canvas, canvas.getContext('2d'));

		EventManager.getInstance().publish("segmentMouseWheel", { eventName: "segmentMouseWheel", segment: this, mouseEvent: e });
	}

	mouseClick(canvas: any, e: MouseEvent) {
		this.draw(canvas, canvas.getContext('2d'));

		EventManager.getInstance().publish("segmentMouseClick", { eventName: "segmentMouseClick", segment: this, mouseEvent: e });
	}
}