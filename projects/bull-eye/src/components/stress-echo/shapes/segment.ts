import { EventManager } from './../../../event-aggregator/event-manager';

import { Shape } from './shape';
import { SegmentPart } from './segment-part';
import { Point } from '../../../services/drawing-map-models';
import { ScoreColorPair, SegmentScore } from '../services/score-color-pair-map.service';
import { Transform } from './transform';

export class Segment extends Shape {
	private _parts: SegmentPart[] = [];
	get parts(): SegmentPart[] {
		return this._parts;
	}
	scoreColorPair: ScoreColorPair = new ScoreColorPair(SegmentScore.Normal, 'greenyellow');

	isMouseOver: boolean = false;

	isPointInPath(canvas: any, context: any, point: Point, transform: Transform): boolean {
		context.beginPath();
		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context, transform) });
		context.closePath();

		return context.isPointInPath(point.X, point.Y);
	}

	draw(canvas: any, context: any, transform: Transform) {
		context.beginPath();
		context.fillStyle = this.scoreColorPair.color;

		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context, transform) });

		context.closePath();
		context.stroke();
		context.fill();
	}

	mouseMove(canvas: any, e: MouseEvent) {
	}

	mouseEnter(canvas: any, e: MouseEvent) {
		this.isMouseOver = true;
	}

	mouseLeave(canvas: any, e: MouseEvent) {
		this.isMouseOver = false;
	}

	mouseUp(canvas: any, e: MouseEvent) {
		canvas.getContext('2d').fillStyle = 'blue';
	}

	mouseWheel(canvas: any, e: MouseWheelEvent) {
		EventManager.getInstance().publish("segmentMouseWheel", { eventName: "segmentMouseWheel", segment: this, mouseEvent: e });
	}

	mouseClick(canvas: any, e: MouseEvent) {
		EventManager.getInstance().publish("segmentMouseClick", { eventName: "segmentMouseClick", segment: this, mouseEvent: e });
	}
}