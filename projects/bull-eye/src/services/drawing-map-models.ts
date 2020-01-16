export interface ViewDescriptor {
    PathImg: String;
    SegmentCollection: SegmentCollection;
}

export interface SegmentCollection {
    SegmentItem: SegmentItem[];
}

export interface SegmentItem {
    Points: Points;
    InternalPoints: Points;
}

export interface Points {
    _type: String;

    Point: Point[];
    Center: Point;
    Start: Start;
    Angle: number;
    Direction: String;
}

export interface Point {
    X: number;
    Y: number;
}

export interface Start {
    Point: Point;
}