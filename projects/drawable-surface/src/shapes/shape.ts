import { ShapeState, initialShapeState } from "./shape-state";
import { Rect } from "./rect";

export interface ISurface {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}

export interface IShape {
    readonly type: string;
    readonly state: ShapeState;
    readonly props: any;

    getGhost(): Rect;
}

export abstract class Shape implements IShape {
    readonly type: string;
    readonly state = initialShapeState;
    readonly props: any;

    constructor(type: string, props?: any) {
        this.type = type;
        this.props = props;
    }

    abstract getGhost(): Rect;
}

export class CompositeShape extends Shape {   
    readonly shapes: IShape[] = [];

    getGhost(): Rect {
        return this.shapes.map(shape => shape.getGhost()).reduce((ghost1, ghost2) => {
            return {
                X1: Math.min(ghost1.X1, ghost2.X1),
                Y1: Math.min(ghost1.Y1, ghost2.Y1),
                X2: Math.max(ghost1.X2, ghost2.X2),
                Y2: Math.max(ghost1.Y2, ghost2.Y2),
            }
        })
    }

    constructor(type?: string, props?: any) {
        super(!type ? 'COMPOSITE_SHAPE' : type, props);
    }
}