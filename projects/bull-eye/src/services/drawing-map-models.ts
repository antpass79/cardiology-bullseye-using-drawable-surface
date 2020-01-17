import { Point } from '@antpass79/drawable-surface';

export interface ViewDescriptor {
    PathImg: String;
    SegmentCollection: SegmentCollection;
}

export interface SegmentCollection {
    SegmentItem: SegmentItem[];
}

export interface SegmentItem {
    StartPoint: Point;
    Points: any; //Points | Points[];
    InternalPoints: Points;
}

export interface Points {
    _type: String;

    Point: Point[];
    Center: Center;
    Start: Start;
    Angle: number;
    Direction: String;
}

export interface Start {
    Point: Point;
}

export interface Center {
    Point: Point;
}