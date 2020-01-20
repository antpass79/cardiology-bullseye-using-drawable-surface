import { ISurface } from "../shapes/shape";
import { Point } from "../shapes/point";

export class MouseService {
    static getPosition(surface: ISurface, e: MouseEvent): Point {
        var rect = surface.canvas.getBoundingClientRect();
        return {
            X: e.clientX - rect.left,
            Y: e.clientY - rect.top
        };
    }
}