import { IShape, ISurface } from "../shapes/shape";
import { MouseService } from '../services/mouse.service';

export class ShapeService {
    static getSelectedShape(surface: ISurface, e: MouseEvent, shapes: IShape[]): IShape {
		let selectedShapes = ShapeService.getSelectedShapes(surface, e, shapes);
		if (selectedShapes.length !== 1) {
			return null;
		}

		return selectedShapes[0];
    }

    static getSelectedShapes(surface: ISurface, e: MouseEvent, shapes: IShape[]): IShape[] {
        let point = MouseService.getPosition(surface, e);
        let selectedShapes = shapes.filter((shape) => shape.isPointInside(surface, point));
        
        return selectedShapes;
    }
}