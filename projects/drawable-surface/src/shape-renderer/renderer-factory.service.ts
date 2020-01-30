import { Injectable } from "@angular/core";
import { ShapeRenderer } from "./shape-renderer";
import { IShape } from "../shapes/shape";
import { PolygonRenderer } from "./polygon-renderer";
import { LineRenderer } from "./line-renderer";
import { ArcRenderer } from "./arc-renderer";
import { CompositeShapeRenderer } from "./composite-shape-renderer";

export interface IRendererFactoryService {
    create(shapeType: string): ShapeRenderer<IShape>;
}

@Injectable()
export class RendererFactoryService implements IRendererFactoryService {
    create(shapeType: string): ShapeRenderer<IShape> {
        switch (shapeType) {
            case "POLYGON_SHAPE": {
                return new PolygonRenderer();
            }
            case "LINE_SHAPE": {
                return new LineRenderer();
            }
            case "ARC_SHAPE": {
                return new ArcRenderer();
            }
            case "COMPOSITE_SHAPE": {
                return new CompositeShapeRenderer();
            }
        }

        throw new Error('Not supported ShapeRenderer');
    }
}