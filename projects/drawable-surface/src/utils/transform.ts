import { Point } from "../shapes/point";

export class Transform {
    translateX: number = 1;
    translateY: number = 1;
    scaleX: number = 0;
    scaleY: number = 0;

    static default(): Transform {
        return new Transform();
    }

    static create(translateX: number, translateY: number, scaleX: number, scaleY: number): Transform {
        let transform = new Transform();
        
        transform.translateX = translateX;
        transform.translateY = translateY;
        transform.scaleX = scaleX;
        transform.scaleY = scaleY;

        return transform;
    }

    point(point: Point) {
        return {
            X: this.translateX + this.scaleX * point.X,
            Y: this.translateY + this.scaleY * point.Y
        };
    }
}