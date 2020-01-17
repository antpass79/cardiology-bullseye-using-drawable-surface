import { Shape, ISurface } from './shape';
import { Segment } from './segment';
import { Point } from '../../../services/drawing-map-models';

export class Picture extends Shape {
	private _segments: Segment[] = [];
	get segments(): Segment[] {
		return this._segments;
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

	draw(surface: ISurface) {
		this.prepareSurface(surface);
		this.drawBackground(surface);
		this.drawSegments(surface);
	}

	mouseMove(surface: ISurface, e: MouseEvent) {
		var location = this.getMousePosition(surface, e);
		let segment = this.getSegmentByPoint(surface, location);
		if (segment)
			segment.mouseMove(surface, e);

		this.updateMouseOver(surface, e, segment);
	}

	mouseClick(surface: ISurface, e: MouseEvent) {
		var location = this.getMousePosition(surface, e);
		let segment = this.getSegmentByPoint(surface, location);
		if (segment)
			segment.mouseClick(surface, e);
	}

	mouseUp(surface: ISurface, e: MouseEvent) {
		var location = this.getMousePosition(surface, e);
		let segment = this.getSegmentByPoint(surface, location);
		if (segment)
			segment.mouseUp(surface, e);
	}

	mouseWheel(surface: ISurface, e: MouseWheelEvent) {
		var location = this.getMousePosition(surface, e);
		let segment = this.getSegmentByPoint(surface, location);
		if (segment != null)
			segment.mouseWheel(surface, e);
	}

	private prepareSurface(surface: ISurface) {
		surface.context.strokeStyle = "black";
		surface.context.lineWidth = 1;
		surface.context.clearRect(0, 0, surface.canvas.width, surface.canvas.width);
	}

	private drawBackground(surface: ISurface) {
		if (this.isBackgroundImageLoaded) {
			surface.context.drawImage(
				this.backgroundImage,
				surface.transform.translateX, surface.transform.translateY, surface.transform.scaleX * this.backgroundImage.width,
				surface.transform.scaleY * this.backgroundImage.height);
		}
	}

	private drawSegments(surface: ISurface) {
		this.segments.forEach((segment: Segment) => segment.draw(surface));
	}

	private updateMouseOver(surface: ISurface, e: MouseEvent, segment: Segment) {
		if (!segment) {
			if (this.segments)
				this.segments.forEach((segmentLeave) => segmentLeave.mouseLeave(surface, e));

			return;
		}

		this.segments.forEach((segmentLeave) => {
			if (segmentLeave.isMouseOver)
				segmentLeave.mouseLeave(surface, e);
		});

		segment.mouseEnter(surface, e);
	}

	getSegmentByPoint(surface: ISurface, point: Point): Segment {
		let segments = this.segments.filter((segment) => segment.isPointInPath(surface, point));
		if (segments.length != 1) {
			return null;
		}

		return segments[0];
	}
}