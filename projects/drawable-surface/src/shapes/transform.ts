import { Point } from "../shapes/point";

export class Transform {
    translateX: number = 0;
    translateY: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;

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