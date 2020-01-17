import { Point } from '../../../services/drawing-map-models';
import { Segment } from './segment';
import { SegmentPart } from './segment-part';
import { Transform } from './transform';

export class SummarySegment extends Segment {
	startPoint: Point = {
		X: 0,
		Y: 0
	};
	internalPoint: Point = {
		X: 0,
		Y: 0
	};

	draw(canvas: any, context: any, transform: Transform) {
		context.beginPath();
		context.fillStyle = this.scoreColorPair.color;

		let transformStart = transform.point(this.startPoint);

		context.moveTo(transformStart.X, transformStart.Y);

		this.parts.forEach((part: SegmentPart) => {
			part.draw(canvas, context, transform);
		});

		context.closePath();
		context.stroke();
		context.fill();
	}
}