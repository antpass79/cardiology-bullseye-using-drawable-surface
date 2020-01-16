import { Point } from "projects/bull-eye/src/services/drawing-map-models";

export class MathService {
    static angle(center: Point, point: Point): number {
        return Math.atan2(point.Y - center.Y, point.X - center.X);
    }

    static radius(center: Point, point: Point): number {
        return Math.sqrt(Math.pow((center.X - point.X), 2) + Math.pow((center.Y - point.Y), 2));
    }

    static toRadians(degree: number): number {
        return degree * Math.PI / 180;
    }
}