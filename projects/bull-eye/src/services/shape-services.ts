import { Points, Point } from "./drawing-map-models";
import { Shape } from "../components/stress-echo/shapes/shape";
import { Arc, Line, Polygon } from "../components/stress-echo/shapes/segment-part";

export interface IShapeBuilder {
    build(points: Points): Shape;
}

export class LineBuilder implements IShapeBuilder {
    build(points: Points): Shape {
        let line = new Line();
        line.startPoint = {
            X: Number(points.Point[0].X),
            Y: Number(points.Point[0].Y)
        };
        line.endPoint = {
            X: Number(points.Point[1].X),
            Y: Number(points.Point[1].Y)
        };

        return line;
    }
}

export class ArcBuilder implements IShapeBuilder {
    build(points: Points): Shape {
        let arc = new Arc();
        arc.centerPoint = {
            X: Number(points.Center.X),
            Y: Number(points.Center.Y)
        };
        arc.startPoint = {
            X: Number(points.Start.Point.X),
            Y: Number(points.Start.Point.Y)
        };
        arc.angle = Number(points.Angle);
        arc.direction = points.Direction;

        return arc;
    }
}

export class PolygonBuilder implements IShapeBuilder {
    build(points: Points): Shape {
        let polygon: Polygon;
        let segmentPoints: Point[] = [];

        points.Point.forEach((point: Point) => {
            segmentPoints.push({
                X: Number(point.X),
                Y: Number(point.Y)
            });

            polygon = new Polygon(segmentPoints);
        });

        return polygon;
    }
}