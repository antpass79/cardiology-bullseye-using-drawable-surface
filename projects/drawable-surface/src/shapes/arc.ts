import { Shape, ISurface } from './shape';
import { Point } from "./point";
import { MathService } from '../utils/math.service';

export class Arc extends Shape {
    constructor(private center: Point, private start: Point, private angle: number, private direction: String) {
        super();
    }

    protected drawSurface(surface: ISurface) {
        let tranformCenter = surface.transform.point(this.center);
        let tranformstart = surface.transform.point(this.start);

        let radius = MathService.radius(tranformCenter, tranformstart);
        let startAngle = MathService.angle(tranformCenter, tranformstart);
        let endAngle = startAngle + MathService.toRadians(this.angle);

        surface.context.arc(tranformCenter.X, tranformCenter.Y, radius, startAngle, endAngle, this.direction.toLowerCase() === 'counterclockwise' ? true : false);
    }
}
