import { Shape } from './shape';
import { Segment } from './segment';
import { Point } from '../../../services/drawing-map-models';
import { Transform } from './transform';

export class BullEye extends Shape {
	
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

	currentTransform: Transform = Transform.default();

	draw(canvas: any, context: any, transform: Transform) {
		context.strokeStyle = "black";
		context.lineWidth = 1;

		context.clearRect(0, 0, canvas.width, canvas.width);

		if (this.isBackgroundImageLoaded)
			context.drawImage(this.backgroundImage, transform.translateX, transform.translateY, transform.scaleX * this.backgroundImage.width, transform.scaleY * this.backgroundImage.height);

		this.segments.forEach((segment: Segment) => segment.draw(canvas, context, transform));
	}

	mouseMove(canvas: any, e: MouseEvent) {
		var location = this.getMousePosition(canvas, e);
		let segment = this.getSegmentByPoint(canvas, location);
		if (segment)
			segment.mouseMove(canvas, e);		

		this.updateMouseOver(segment, canvas, e);
	}

	private updateMouseOver(segment: Segment, canvas: any, e: MouseEvent) {
		if (!segment) {
			if (this.segments)
				this.segments.forEach((segmentLeave) => segmentLeave.mouseLeave(canvas, e));
	
			return;
		}

		this.segments.forEach((segmentLeave) => {
			if (segmentLeave.isMouseOver)
				segmentLeave.mouseLeave(canvas, e);
		});

		segment.mouseEnter(canvas, e);
	}

	mouseUp(canvas: any, e: MouseEvent) {
		var location = this.getMousePosition(canvas, e);
		let segment = this.getSegmentByPoint(canvas, location);
		if (segment)
			segment.mouseUp(canvas, e);
	}

	mouseWheel(canvas: any, e: MouseWheelEvent) {
		var location = this.getMousePosition(canvas, e);
		let segment = this.getSegmentByPoint(canvas, location);
		if (segment != null)
			segment.mouseWheel(canvas, e);
	}

	mouseClick(canvas: any, e: MouseEvent) {
		var location = this.getMousePosition(canvas, e);
		let segment = this.getSegmentByPoint(canvas, location);
		if (segment)
			segment.mouseClick(canvas, e);
	}

	getSegmentByPoint(canvas: any, point: Point): Segment {
		let context = canvas.getContext('2d');
		let segments = this.segments.filter((segment) => segment.isPointInPath(canvas, context, point, this.currentTransform));

		if (segments.length != 1)
			return null;

		return segments[0];
	}
}