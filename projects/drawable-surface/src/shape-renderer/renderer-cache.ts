import { Injectable } from "@angular/core";
import { ShapeRenderer } from "./shape-renderer";
import { IShape } from "../shapes/shape";
import { IRendererFactoryService } from "./renderer-factory.service";

@Injectable()
export class RendererCache {
    private map: Map<string, ShapeRenderer<IShape>> = new Map<string, ShapeRenderer<IShape>>();

    constructor(private rendererFactoryService: IRendererFactoryService) {
    }

    get(shapeType: string): ShapeRenderer<IShape> {
        if (this.map.has(shapeType)) {
            return this.map.get(shapeType);
        }

        this.map.set(shapeType, this.rendererFactoryService.create(shapeType));
        return this.map.get(shapeType);
    }
}