import { Point } from "../shapes/point";

export interface Transform {
    readonly translateX: number;
    readonly translateY: number;
    readonly scaleX: number;
    readonly scaleY: number;
}

export class TransformService {
    static default(): Transform {
        return {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1
        };
    }

    static create(translateX: number, translateY: number, scaleX: number, scaleY: number): Transform {
        return {
            translateX: translateX,
            translateY: translateY,
            scaleX: scaleX,
            scaleY: scaleY

        };
    }

    static point(transform: Transform, point: Point) {
        return {
            X: transform.translateX + transform.scaleX * point.X,
            Y: transform.translateY + transform.scaleY * point.Y
        };
    }
}