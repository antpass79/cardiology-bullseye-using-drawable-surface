import { Shape, ISurface } from './shape';
import { Point } from "./point";

export class Polygon extends Shape {
	private _points: Point[]
	get points(): Point[] {
		return this._points;
	}

	constructor (points: Point[]) {
		super();

		this._points = points;
	}

	protected drawSurface(surface: ISurface) {
		this.points.forEach((point: Point) => {
            let transformPoint = surface.transform.point(point);
			surface.context.lineTo(
				transformPoint.X,
				transformPoint.Y);
		});
	}
}