import { Injectable } from '@angular/core';
import { Points, Point } from './drawing-map-models';
import { Polygon } from '../components/stress-echo/shapes/segment-part';
import { Segment } from '../components/stress-echo/shapes/segment';

@Injectable({
    providedIn: 'root',
})
export class SegmentBuilderFactoryService {
    create(type: String): SegmentBuilder {
        switch (type) {
            case 'line':
                return new PolygonSegmentBuilder();
            case 'arc':
                return new ArcSegmentBuilder();
            default:
                throw new Error('Not supported Drawing Map');
        }
    }
}

export interface SegmentBuilder {
    build(points: Points): Segment;
}

export class PolygonSegmentBuilder implements SegmentBuilder {
    build(points: Points): Segment {
        let segment = new Segment();
        let segmentPoints: Point[] = [];

        points.Point.forEach((point: Point) => {
            segmentPoints.push({
                X: Number(point.X),
                Y: Number(point.Y)
            });

            let polygon = new Polygon(segmentPoints);
            segment.parts.push(polygon);
        });

        return segment;
    }
}

export class ArcSegmentBuilder implements SegmentBuilder {
    build(points: Points): Segment {
        return null;
    }
}

export class LineSegmentBuilder implements SegmentBuilder {
    build(points: Points): Segment {
        return null;
    }
}
