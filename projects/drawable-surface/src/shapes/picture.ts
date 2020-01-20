import { Shape, IShape, ISurface } from './shape';
import { MouseService } from '../utils/mouse.service';

export class Picture extends Shape {
	private _shapes: IShape[] = [];
	get shapes(): IShape[] {
		return this._shapes;
	}

	isBackgroundImageLoaded: boolean = false;
	private _backgroundImage: HTMLImageElement = new Image();
	get backgroundImage(): HTMLImageElement {
		return this._backgroundImage;
	}

	setImageBackground(image: string) {
		this.backgroundImage.onload = (event: any) => {
			this.isBackgroundImageLoaded = true;
		};

		this.backgroundImage.src = image;
	}

	mouseMove(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseMove(surface, e);
	}

	mouseClick(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseClick(surface, e);
	}

	mouseDoubleClick(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseDoubleClick(surface, e);
	}

	mouseDown(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseUp(surface, e);
	}

	mouseUp(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseUp(surface, e);
	}

	mouseEnter(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseEnter(surface, e);
	}

	mouseLeave(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseLeave(surface, e);
	}

	mouseOver(surface: ISurface, e: MouseEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseOver(surface, e);
	}

	mouseWheel(surface: ISurface, e: MouseWheelEvent) {
		let shape = this.getSelectedShape(surface, e);
		if (shape)
			shape.mouseWheel(surface, e);
	}

	protected prepareSurface(surface: ISurface) {
		surface.context.strokeStyle = this.appearance.strokeStyle;
		surface.context.lineWidth = this.appearance.lineWidth;
		surface.context.clearRect(0, 0, surface.canvas.width, surface.canvas.width);
	}
	
	protected drawSurface(surface: ISurface) {
		if (this.isBackgroundImageLoaded) {
			surface.context.drawImage(
				this.backgroundImage,
				surface.transform.translateX, surface.transform.translateY, surface.transform.scaleX * this.backgroundImage.width,
				surface.transform.scaleY * this.backgroundImage.height);
		}

		this.shapes.forEach((shape: IShape) => shape.draw(surface));
	}

	// private updateMouseOver(surface: ISurface, e: MouseEvent, shape: IShape) {
	// 	if (!shape) {
	// 		if (this.shapes)
	// 			this.shapes.forEach((shapeLeave) => shapeLeave.mouseLeave(surface, e));

	// 		return;
	// 	}

	// 	this.shapes.forEach((segmentLeave) => {
	// 		if (segmentLeave.isMouseOver)
	// 			segmentLeave.mouseLeave(surface, e);
	// 	});

	// 	shape.mouseEnter(surface, e);
	// }

	getSelectedShape(surface: ISurface, e: MouseEvent): IShape {
		let point = MouseService.getPosition(surface, e);
		let shapes = this.shapes.filter((segment) => segment.isPointInside(surface, point));
		if (shapes.length !== 1) {
			return null;
		}

		return shapes[0];
	}
}