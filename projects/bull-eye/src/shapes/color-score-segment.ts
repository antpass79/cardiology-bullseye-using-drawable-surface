import { Injectable } from "@angular/core";

import { CompositeShape, IShape } from "@antpass79/drawable-surface";
import { ShapeRenderer } from "@antpass79/drawable-surface";
import { IRendererContext } from "@antpass79/drawable-surface";
import { CompositeShapeRenderer } from "@antpass79/drawable-surface";
import { RendererFactoryService } from "@antpass79/drawable-surface";

import { ScoreColorPair, SegmentScore } from "../services/score-color-pair-map.service";

export class ScoreColorSegment extends CompositeShape {
    constructor() {
        super('SCORECOLORSEGMENT_SHAPE', new ScoreColorPair(SegmentScore.Normal, 'greenyellow'));
    }
}

export class ScoreColorSegmentRenderer extends ShapeRenderer<ScoreColorSegment> {
    private shapesRenderer: CompositeShapeRenderer = new CompositeShapeRenderer();

    protected prepareSurface(rendererContext: IRendererContext, shape: ScoreColorSegment) {
        rendererContext.surface.context.beginPath();
        shape.state.appearance.fill = shape.props.color;
        rendererContext.surface.context.lineWidth = shape.state.appearance.lineWidth;
        rendererContext.surface.context.strokeStyle = shape.state.appearance.strokeStyle;
        rendererContext.surface.context.fillStyle = shape.state.appearance.fill;
    }

    protected drawSurface(rendererContext: IRendererContext, shape: ScoreColorSegment) {
        this.shapesRenderer.draw(rendererContext, shape);
    }

    protected completeSurface(rendererContext: IRendererContext) {
        rendererContext.surface.context.closePath();
        rendererContext.surface.context.stroke();
        rendererContext.surface.context.fill();
    }
}

@Injectable({
    providedIn: 'root',
})
export class BullEyeRendererFactoryService extends RendererFactoryService {
    create(shapeType: string): ShapeRenderer<IShape> {
        switch (shapeType) {
            case "SCORECOLORSEGMENT_SHAPE": {
            return new ScoreColorSegmentRenderer();
            }
            default:
                return super.create(shapeType);
        }
    }
}