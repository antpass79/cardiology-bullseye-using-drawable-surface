import { Point } from '../../services/drawing-map-models';
import { Transform } from '../utils/transform';

export interface ISurface {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    transform: Transform
}

export interface IShape {
    draw(surface: ISurface);

    mouseMove(surface: ISurface, e: MouseEvent);
    mouseClick(surface: ISurface, e: MouseEvent);
    mouseUp(surface: ISurface, e: MouseEvent);
    mouseEnter(surface: ISurface, e: MouseEvent);
    mouseLeave(surface: ISurface, e: MouseEvent);
    mouseWheel(surface: ISurface, e: MouseWheelEvent);

    isPointInside(surface: ISurface, point: Point): boolean;
}

export class Shape implements IShape {
    draw(surface: ISurface) {
    }
    mouseMove(surface: ISurface, e: MouseEvent) {
    }
    mouseClick(surface: ISurface, e: MouseEvent) {        
    }
    mouseUp(surface: ISurface, e: MouseEvent) {        
    }
    mouseEnter(surface: ISurface, e: MouseEvent) {
    }
    mouseLeave(surface: ISurface, e: MouseEvent) {        
    }
    mouseWheel(surface: ISurface, e: MouseWheelEvent) {        
    }
    isPointInside(surface: ISurface, point: Point): boolean {
        return false;
    }

    protected getMousePosition(surface: ISurface, e: MouseEvent): Point {
		var rect = surface.canvas.getBoundingClientRect();
		return {
            X: e.clientX - rect.left,
            Y: e.clientY - rect.top
        };
	}
}