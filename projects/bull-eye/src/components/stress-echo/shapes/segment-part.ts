import { Shape } from './shape';
import { Point } from './point';

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

			context.lineTo(point.x, point.y);
		});
	}
}

export class Line extends SegmentPart {

    startPoint: Point = new Point(0, 0);
    endPoint: Point = new Point(0, 0);

    draw(canvas: any, context: any) {

        context.moveTo(this.startPoint.x, this.startPoint.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
    }
}

export class Arc extends SegmentPart {

    centerPoint: Point = new Point(0, 0);
    startPoint: Point = new Point(0, 0);
    angle: number = 64;
    direction: 'clockwise';

    draw(canvas: any, context: any) {

        let radius = this.getRadius(this.centerPoint, this.startPoint);
        let endPoint = this.getEndPoint(this.centerPoint, this.startPoint, this.angle);
        let startAngle = this.getStartAngle(this.angle);
        let endAngle = this.getEndAngle(this.centerPoint, this.startPoint);

        console.log('radius');
        console.log(radius);
        console.log('startPoint');
        console.log(this.startPoint);
        console.log('endPoint');
        console.log(endPoint);
        console.log('startAngle');
        console.log(startAngle);
        console.log('endAngle');
        console.log(endAngle);

        context.arc(this.centerPoint.x, this.centerPoint.y, radius, -startAngle, endAngle, this.direction.toLowerCase() == 'clockwise' ? true : false);
    }

    getStartAngle(degree: number): number {

        let startAngle = 2 * Math.PI * degree / 360;
        return startAngle;
    }

    getEndAngle(centerPoint: Point, startPoint: Point): number {

        let endAngle = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x);
        return endAngle;
    }

    getRadius(centerPoint: Point, startPoint: Point) {

        let radius = Math.sqrt(Math.pow(startPoint.y - centerPoint.y, 2) + Math.pow(startPoint.x - centerPoint.x, 2));
        return radius;
    }

    getEndPoint(centerPoint: Point, startPoint: Point, angle: number) {

        let radius = this.getRadius(centerPoint, startPoint);
        let angleRad = 2 * Math.PI * angle / 360;
        let b = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x) + angleRad;

        let endPoint = new Point(
            centerPoint.x + radius * Math.cos(b),
            centerPoint.y + radius * Math.sin(b));


        console.log('PROVA endPoint');
        console.log(endPoint);
        return endPoint;
    }
}
