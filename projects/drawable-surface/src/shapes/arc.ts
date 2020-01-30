import { Shape } from './shape';
import { Point } from "./point";
import { MathService } from '../services/math.service';
import { Rect } from './rect';

export class Arc extends Shape {
    constructor(public readonly center: Point, public readonly start: Point, public readonly angle: number, public readonly direction: String) {
        super('ARC_SHAPE');
    }

	getGhost(): Rect {
        let radius = MathService.radius(this.center, this.start);
        let startAngle = MathService.angle(this.center, this.start);
        let endAngle = startAngle + MathService.toRadians(this.angle);
        let endPoint = MathService.endPoint(this.center, radius, startAngle + endAngle);

		return {
			X1: Math.min(Math.min(this.start.X, endPoint.X), this.center.X),
			Y1: Math.min(Math.min(this.start.Y, endPoint.Y), this.center.Y),
			X2: Math.max(Math.max(this.start.X, endPoint.X), this.center.X),
			Y2: Math.max(Math.max(this.start.Y, endPoint.Y), this.center.Y)
		};
	}
}
