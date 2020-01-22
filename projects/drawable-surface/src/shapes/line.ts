import { Shape, ISurface } from './shape';
import { Point } from "./point";
import { Rect } from './rect';

export class Line extends Shape {
    startPoint: Point = {
        X: 0,
        Y: 0
    };
    endPoint: Point = {
        X: 0,
        Y: 0
    };

	getGhost(): Rect {
		return {
			X1: Math.min(this.startPoint.X, this.endPoint.X),
			Y1: Math.min(this.startPoint.Y, this.endPoint.Y),
			X2: Math.max(this.startPoint.X, this.endPoint.X),
			Y2: Math.max(this.startPoint.Y, this.endPoint.Y),
		};
	}

    protected drawSurface(surface: ISurface) {
        let transformStart = surface.transform.point(this.startPoint);
        let transformEnd = surface.transform.point(this.endPoint);

        surface.context.moveTo(
            transformStart.X,
            transformStart.Y);
        surface.context.lineTo(
            transformEnd.X,
            transformEnd.Y);
    }
}