import { ShapeRenderer } from "./shape-renderer";
import { CompositeShape, IShape } from "../shapes/shape";
import { IRendererContext } from "./renderer-context";

export class CompositeShapeRenderer extends ShapeRenderer<CompositeShape> {
    drawSurface(rendererContext: IRendererContext, shape: CompositeShape) {
        shape.shapes.forEach(shapePart => {
            let renderer: ShapeRenderer<IShape> = rendererContext.rendererCache.get(shapePart.type);
            renderer.draw(rendererContext, shapePart);
        });
    }
}