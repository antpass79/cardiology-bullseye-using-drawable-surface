import { Shape, ISurface } from './shape';
import { Point } from '../../../services/drawing-map-models';

export class Polygon extends Shape {

	constructor (private points: Point[]) {
		super();
	}

	draw(surface: ISurface) {
		this.points.forEach((point: Point) => {
            let transformPoint = surface.transform.point(point);
			surface.context.lineTo(transformPoint.X, transformPoint.Y);
		});
	}
}