import { ShapeRenderer } from "./shape-renderer";
import { Line } from "../shapes/line";
import { IRendererContext } from "./renderer-context";
import { TransformService } from "../shapes/transform";

export class LineRenderer extends ShapeRenderer<Line> {
    drawSurface(rendererContext: IRendererContext, shape: Line) {
		let start = TransformService.point(rendererContext.state.transform, shape.startPoint);
		let end = TransformService.point(rendererContext.state.transform, shape.endPoint);

        rendererContext.surface.context.moveTo(
            start.X,
            start.Y);
			rendererContext.surface.context.lineTo(
            end.X,
            end.Y);
    }
}