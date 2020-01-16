import { Shape } from './shape';
import { Point } from '../../../services/drawing-map-models';

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

    centerPoint: Point = {
        X: 0,
        Y: 0
    };
    startPoint: Point = {
        X: 0,
        Y: 0
    };
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

        context.arc(this.centerPoint.X, this.centerPoint.Y, radius, -startAngle, endAngle, this.direction.toLowerCase() == 'clockwise' ? true : false);
    }

    getStartAngle(degree: number): number {

        let startAngle = 2 * Math.PI * degree / 360;
        return startAngle;
    }

    getEndAngle(centerPoint: Point, startPoint: Point): number {

        let endAngle = Math.atan2(startPoint.Y - centerPoint.Y, startPoint.X - centerPoint.X);
        return endAngle;
    }

    getRadius(centerPoint: Point, startPoint: Point) {

        let radius = Math.sqrt(Math.pow(startPoint.Y - centerPoint.Y, 2) + Math.pow(startPoint.X - centerPoint.X, 2));
        return radius;
    }

    getEndPoint(centerPoint: Point, startPoint: Point, angle: number) {

        let radius = this.getRadius(centerPoint, startPoint);
        let angleRad = 2 * Math.PI * angle / 360;
        let b = Math.atan2(startPoint.Y - centerPoint.Y, startPoint.X - centerPoint.X) + angleRad;

        let endPoint = {
            X: centerPoint.X + radius * Math.cos(b),
            Y: centerPoint.Y + radius * Math.sin(b)
        };

        console.log('PROVA endPoint');
        console.log(endPoint);
        return endPoint;
    }
}
