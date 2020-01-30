import { ShapeRenderer } from "./shape-renderer";
import { Arc } from "../shapes/arc";
import { MathService } from "../services/math.service";
import { IRendererContext } from "./renderer-context";
import { TransformService } from "../shapes/transform";

export class ArcRenderer extends ShapeRenderer<Arc> {
    drawSurface(rendererContext: IRendererContext, shape: Arc) {
        let center = TransformService.point(rendererContext.state.transform, shape.center);
        let start = TransformService.point(rendererContext.state.transform, shape.start);

        let radius = MathService.radius(center, start);
        let startAngle = MathService.angle(center, start);
        let endAngle = startAngle + MathService.toRadians(shape.angle);

        rendererContext.surface.context.arc(
            center.X,
            center.Y,
            radius,
            startAngle,
            endAngle,
            shape.direction.toLowerCase() === 'counterclockwise' ? true : false);
    }
}