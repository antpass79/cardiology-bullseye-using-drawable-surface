import { Point } from '../../../services/drawing-map-models';
import { Segment } from './segment';
import { SegmentPart } from './segment-part';

export class SummarySegment extends Segment {

	startPoint: Point = {
		X: 0,
		Y: 0
	};
	internalPoint: Point = {
		X: 0,
		Y: 0
	};

	draw(canvas: any, context: any) {
		context.beginPath();
		context.fillStyle = this.fill;

		context.moveTo(this.startPoint.X, this.startPoint.Y);

		this.parts.forEach((part: SegmentPart) => {
			part.draw(canvas, context);
		});

		context.closePath();
		context.stroke();
		context.fill();
	}
}