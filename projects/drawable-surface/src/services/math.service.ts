import { Point } from "../shapes/point";

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

    static endPoint(center: Point, radius: number, angle: number): Point {
        return {
            X: center.X + radius * Math.cos(angle),
            Y: center.Y + radius * Math.sin(angle)
        };
    }
}