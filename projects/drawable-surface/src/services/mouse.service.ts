import { Point } from "../shapes/point";

export class MouseService {
    static getPosition(canvas: HTMLCanvasElement, e: MouseEvent): Point {
        var rect = canvas.getBoundingClientRect();
        return {
            X: e.clientX - rect.left,
            Y: e.clientY - rect.top
        };
    }
}