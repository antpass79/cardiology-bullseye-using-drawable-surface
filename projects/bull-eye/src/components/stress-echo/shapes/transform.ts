import { Point } from "projects/bull-eye/src/services/drawing-map-models";

export class Transform {
    translateX: number = 1;
    translateY: number = 1;
    scaleX: number = 0;
    scaleY: number = 0;

    static default(): Transform {
        return new Transform();
    }

    point(point: Point) {
        return {
            X: this.translateX + this.scaleX * point.X,
            Y: this.translateY + this.scaleY * point.Y
        };
    }
}