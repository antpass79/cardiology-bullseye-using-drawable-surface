import { ShapeRenderer } from "./shape-renderer";
import { Polygon } from "../shapes/polygon";
import { Point } from "../shapes/point";
import { IRendererContext } from "./renderer-context";
import { TransformService } from "../shapes/transform";

export class PolygonRenderer extends ShapeRenderer<Polygon> {
  drawSurface(rendererContext: IRendererContext, shape: Polygon) {
    shape.points.forEach((point: Point) => {
      let updatedPoint = TransformService.point(rendererContext.state.transform, point);
      rendererContext.surface.context.lineTo(
        updatedPoint.X,
        updatedPoint.Y);
    });
  }
}