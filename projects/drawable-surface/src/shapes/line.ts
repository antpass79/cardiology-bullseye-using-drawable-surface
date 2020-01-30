import { Shape } from './shape';
import { Rect } from './rect';

export class Line extends Shape {
    constructor(public readonly startPoint, public readonly endPoint) {
        super('LINE_SHAPE');
    }

	getGhost(): Rect {
		return {
			X1: Math.min(this.startPoint.X, this.endPoint.X),
			Y1: Math.min(this.startPoint.Y, this.endPoint.Y),
			X2: Math.max(this.startPoint.X, this.endPoint.X),
			Y2: Math.max(this.startPoint.Y, this.endPoint.Y),
		};
	}
}