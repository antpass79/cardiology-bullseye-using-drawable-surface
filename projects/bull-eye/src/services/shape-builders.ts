import { Points, Point } from "./drawing-map-models";
import { IShape, Line, Arc, Polygon } from "../drawable-surface";

export interface IShapeBuilder {
    build(points: Points): IShape;
}

export class LineBuilder implements IShapeBuilder {
    build(points: Points): IShape {
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
    build(points: Points): IShape {
        let arc = new Arc({
            X: Number(points.Center.Point.X),
            Y: Number(points.Center.Point.Y)
        },
        {
            X: Number(points.Start.Point.X),
            Y: Number(points.Start.Point.Y)
        },
        points.Angle,
        points.Direction);

        return arc;
    }
}

export class PolygonBuilder implements IShapeBuilder {
    build(points: Points): IShape {
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