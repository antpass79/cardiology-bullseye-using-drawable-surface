import { IShape } from "../shapes/shape";
import { IRendererContext } from "./renderer-context";
import { Point } from "../shapes/point";

export interface IShapeRenderer<T extends IShape> {
    draw(rendererContext: IRendererContext, shape: T);
    isPointInside(rendererContext: IRendererContext, shape: T, point: Point): boolean;
}

export class ShapeRenderer<T extends IShape> implements IShapeRenderer<T> {
    draw(rendererContext: IRendererContext, shape: T) {
        if (!shape) {
            return;
        }

        this.prepareSurface(rendererContext, shape);
        this.drawSurface(rendererContext, shape);
        this.completeSurface(rendererContext, shape);
    }
    isPointInside(rendererContext: IRendererContext, shape: T, point: Point): boolean {
        this.draw(rendererContext, shape);
        return rendererContext.surface.context.isPointInPath(point.X, point.Y);
    }

    protected prepareSurface(rendererContext: IRendererContext, shape: T) {
    }

    protected drawSurface(rendererContext: IRendererContext, shape: T) {
    }

    protected completeSurface(rendererContext: IRendererContext, shape: T) {
    }

}