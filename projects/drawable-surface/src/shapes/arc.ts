import { Shape, ISurface } from './shape';
import { Point } from "./point";
import { MathService } from '../services/math.service';
import { Rect } from './rect';

export class Arc extends Shape {
    constructor(private center: Point, private start: Point, private angle: number, private direction: String) {
        super();
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

    protected drawSurface(surface: ISurface) {
        let tranformCenter = surface.transform.point(this.center);
        let tranformstart = surface.transform.point(this.start);

        let radius = MathService.radius(tranformCenter, tranformstart);
        let startAngle = MathService.angle(tranformCenter, tranformstart);
        let endAngle = startAngle + MathService.toRadians(this.angle);

        surface.context.arc(
            tranformCenter.X,
            tranformCenter.Y,
            radius,
            startAngle,
            endAngle,
            this.direction.toLowerCase() === 'counterclockwise' ? true : false);
    }
}
