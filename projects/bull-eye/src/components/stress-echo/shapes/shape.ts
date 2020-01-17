import { Point } from '../../../services/drawing-map-models';

export class Shape {
	draw(canvas: any, context: any) { }
	mouseUp(canvas: any, e: MouseEvent) { }

	protected getMousePosition(canvas: any, e: MouseEvent): Point {
		var rect = canvas.getBoundingClientRect();
		return {
            X: e.clientX - rect.left,
            Y: e.clientY - rect.top
        };
	}

    get Points(): Point[] {
        return null;
    }

    public isPointInside(canvas: any, points: Point[], location: Point): boolean {
        var context = canvas.getContext('2d');
        context.beginPath();

        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i].X, points[i].Y);
        }

        return context.isPointInPath(location.X, location.Y);
    }
}