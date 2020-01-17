import { Shape } from './shape';
import { Point } from '../../../services/drawing-map-models';
import { MathService } from '../services/math.service';

export class SegmentPart extends Shape {
}

export class Polygon extends SegmentPart {

	constructor (private points: Point[]) {
		super();
	}

	get Points(): Point[] {
		return this.points;
	}

	draw(canvas: any, context: any) {
		this.points.forEach((point: Point) => {
			context.lineTo(point.X, point.Y);
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

    draw(canvas: any, context: any) {
        context.moveTo(this.startPoint.X, this.startPoint.Y);
        context.lineTo(this.endPoint.X, this.endPoint.Y);
    }
}

export class Arc extends SegmentPart {
    constructor(private center: Point, private start: Point, private angle: number, private direction: String) {
        super();
    }

    draw(canvas: any, context: any) {
        let radius = MathService.radius(this.center, this.start);
        let startAngle = MathService.angle(this.center, this.start);
        let endAngle = startAngle + MathService.toRadians(this.angle);

        context.arc(this.center.X, this.center.Y, radius, startAngle, endAngle, this.direction.toLowerCase() === 'counterclockwise' ? true : false);
    }
}
