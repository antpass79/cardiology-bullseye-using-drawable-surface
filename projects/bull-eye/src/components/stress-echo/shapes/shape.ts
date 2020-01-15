import { Point } from './point';

export class Shape {
	
	draw(canvas: any, context: any) { }
	mouseUp(canvas: any, e: MouseEvent) { }

	protected getMousePosition(canvas: any, e: MouseEvent): Point {
		
		var rect = canvas.getBoundingClientRect();
		return new Point(e.clientX - rect.left, e.clientY - rect.top);
	}

    get Points(): Point[] {

        return null;
    }

    public isPointInside(canvas: any, points: Point[], location: Point): boolean {

        var context = canvas.getContext('2d');
        context.beginPath();

        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }

        return context.isPointInPath(location.x, location.y);
    }
}