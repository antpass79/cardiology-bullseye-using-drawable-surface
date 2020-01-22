import { IShape, CompositeShape, ISurface } from './shape';
import { ShapeService } from '../services/shape.service';
import { Rect } from './rect';

export class Picture extends CompositeShape {
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
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseMove(surface, e);
	}

	mouseClick(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseClick(surface, e);
	}

	mouseDoubleClick(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseDoubleClick(surface, e);
	}

	mouseDown(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseUp(surface, e);
	}

	mouseUp(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseUp(surface, e);
	}

	mouseEnter(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseEnter(surface, e);
	}

	mouseLeave(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseLeave(surface, e);
	}

	mouseOver(surface: ISurface, e: MouseEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
		if (shape)
			shape.mouseOver(surface, e);
	}

	mouseWheel(surface: ISurface, e: MouseWheelEvent) {
		let shape = ShapeService.getSelectedShape(surface, e, this.shapes);
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
				surface.transform.translateX,
				surface.transform.translateY,
				surface.transform.scaleX * this.backgroundImage.width,
				surface.transform.scaleY * this.backgroundImage.height);
		}

		this.shapes.forEach((shape: IShape) => shape.draw(surface));
	}
}