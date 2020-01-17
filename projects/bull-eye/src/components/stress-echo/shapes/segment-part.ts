import { Shape } from './shape';
import { Point } from '../../../services/drawing-map-models';
import { MathService } from '../services/math.service';
import { Transform } from './transform';

export class SegmentPart extends Shape {
}

export class Polygon extends SegmentPart {

	constructor (private points: Point[]) {
		super();
	}

	get Points(): Point[] {
		return this.points;
	}

	draw(canvas: any, context: any, transform: Transform) {
		this.points.forEach((point: Point) => {
            let transformPoint = transform.point(point);
			context.lineTo(transformPoint.X, transformPoint.Y);
		});
	}
}

export class Line extends SegmentPart {
    startPoint: Point = {
        X: 0,
        Y: 0
    };
    endPoint: Point = {
        X: 0,
        Y: 0
    };

    draw(canvas: any, context: any, transform: Transform) {
        let transformStart = transform.point(this.startPoint);
        let transformEnd = transform.point(this.endPoint);

        context.moveTo(transformStart.X, transformStart.Y);
        context.lineTo(transformEnd.X, transformEnd.Y);
    }
}

export class Arc extends SegmentPart {
    constructor(private center: Point, private start: Point, private angle: number, private direction: String) {
        super();
    }

    draw(canvas: any, context: any, transform: Transform) {
        let tranformCenter = transform.point(this.center);
        let tranformstart = transform.point(this.start);

        let radius = MathService.radius(tranformCenter, tranformstart);
        let startAngle = MathService.angle(tranformCenter, tranformstart);
        let endAngle = startAngle + MathService.toRadians(this.angle);

        context.arc(tranformCenter.X, tranformCenter.Y, radius, startAngle, endAngle, this.direction.toLowerCase() === 'counterclockwise' ? true : false);
    }
}
