import { Shape, ISurface } from './shape';
import { Point } from '../../services/drawing-map-models';

export class Line extends Shape {
    startPoint: Point = {
        X: 0,
        Y: 0
    };
    endPoint: Point = {
        X: 0,
        Y: 0
    };

    draw(surface: ISurface) {
        let transformStart = surface.transform.point(this.startPoint);
        let transformEnd = surface.transform.point(this.endPoint);

        surface.context.moveTo(transformStart.X, transformStart.Y);
        surface.context.lineTo(transformEnd.X, transformEnd.Y);
    }
}