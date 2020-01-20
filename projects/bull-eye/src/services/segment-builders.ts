import { Injectable } from "@angular/core";

import { SegmentItem, Points } from "./drawing-map-models";
import { PolygonBuilder, LineBuilder, ArcBuilder } from "./shape-builders";
import { IShape } from '@antpass79/drawable-surface';
import { ScoreColorSegment } from "./score-color-pair-map.service";

export interface ISegmentBuilder {
    build(segmentItem: SegmentItem): ScoreColorSegment;
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

    build(segmentItem: SegmentItem): ScoreColorSegment {
        let segmentBuilder = this.segmentBuilderFactoryService.create(segmentItem);
        return segmentBuilder.build(segmentItem);
    }
}

export class LinePolygonSegmentBuilder implements ISegmentBuilder {
    private polygonBuilder = new PolygonBuilder();

    build(segmentItem: SegmentItem): ScoreColorSegment {
        let polygon = this.polygonBuilder.build(segmentItem.Points);
        let segment = new ScoreColorSegment();
        segment.shapes.push(polygon);

        return segment;
    }
}

export class ArcPolygonSegmentBuilder implements ISegmentBuilder {
    build(segmentItem: SegmentItem): ScoreColorSegment {
        let segment: ScoreColorSegment = new ScoreColorSegment();

        segmentItem.Points.forEach((points: Points) => {
            let shape: IShape;

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

            segment.shapes.push(shape);
        });

        return segment;
    }
}