import { Point } from './point';
import { Segment } from './segment';
import { SegmentPart } from './segment-part';

export class SummarySegment extends Segment {

    startPoint: Point = new Point(0, 0);
    internalPoint: Point = new Point(0, 0);

    	draw(canvas: any, context: any) {

		context.beginPath();
		context.fillStyle = this.fill;

        context.moveTo(this.startPoint.x, this.startPoint.y);

        // this.parts[0].draw(canvas, context);
        // this.parts[1].draw(canvas, context);
        // this.parts[2].draw(canvas, context);
        this.parts[2].draw(canvas, context);
		//this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });

		context.closePath();
		context.stroke();
		context.fill();
	}
}