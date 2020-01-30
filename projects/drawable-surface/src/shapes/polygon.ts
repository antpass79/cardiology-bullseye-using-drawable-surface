import { Shape } from './shape';
import { Point } from "./point";
import { Rect } from './rect';

export class Polygon extends Shape {
	constructor (public readonly points: Point[]) {
		super('POLYGON_SHAPE');
	}

	getGhost(): Rect {
		let minPoint = this.points.reduce((point1, point2) => {
			return {
				X: Math.min(point1.X, point2.X),
				Y: Math.min(point1.Y, point2.Y)
			}
		});
		let maxPoint = this.points.reduce((point1, point2) => {
			return {
				X: Math.max(point1.X, point2.X),
				Y: Math.max(point1.Y, point2.Y)
			}
		});
		return {
			X1: minPoint.X,
			Y1: minPoint.Y,
			X2: maxPoint.X,
			Y2: maxPoint.Y
		};
	}
}