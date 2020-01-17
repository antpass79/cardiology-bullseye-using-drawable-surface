import { Injectable } from "@angular/core";

import { SegmentItem, Points } from "./drawing-map-models";
import { Segment } from "../components/stress-echo/shapes/segment";
import { PolygonBuilder, LineBuilder, ArcBuilder } from "./shape-builders";
import { Shape } from "../components/stress-echo/shapes/shape";

export interface ISegmentBuilder {
    build(segmentItem: SegmentItem): Segment;
}

@Injectable({
    providedIn: 'root',
})
export class SegmentBuilderFactory {
    create(segmentItem: SegmentItem): ISegmentBuilder {
        if (!segmentItem.StartPoint) {
            return new LinePolygonSegmentBuilder();
        }

        return new ArcPolygonSegmentBuilder();
    }
}

@Injectable({
    providedIn: 'root',
})
export class SegmentBuilder implements ISegmentBuilder {
    constructor(private segmentBuilderFactoryService: SegmentBuilderFactory) {
    }

    build(segmentItem: SegmentItem): Segment {
        let segmentBuilder = this.segmentBuilderFactoryService.create(segmentItem);
        return segmentBuilder.build(segmentItem);
    }
}

export class LinePolygonSegmentBuilder implements ISegmentBuilder {
    private polygonBuilder = new PolygonBuilder();

    build(segmentItem: SegmentItem): Segment {
        let polygon = this.polygonBuilder.build(segmentItem.Points);
        let segment = new Segment();
        segment.parts.push(polygon);

        return segment;
    }
}

export class ArcPolygonSegmentBuilder implements ISegmentBuilder {
    build(segmentItem: SegmentItem): Segment {
        let segment: Segment = new Segment();

        segmentItem.Points.forEach((points: Points) => {
            let shape: Shape;

            switch (points._type) {
                case "line":
                    shape = new LineBuilder().build(points);
                    break;
                case "arc":
                    shape = new ArcBuilder().build(points);
                    break;
                default:
                    throw new Error('ShapeBuilder not supported');
            }

            segment.parts.push(shape);
        });

        return segment;
    }
}