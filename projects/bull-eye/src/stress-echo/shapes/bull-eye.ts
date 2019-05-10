import { Shape } from './shape';
import { Segment } from './segment';
import { Point } from './point';

export class BullEye extends Shape {
	
	segments = new Array<Segment>();
	private backgroundImage: HTMLImageElement = new Image();
	isBackgroundImageLoaded: boolean = false;

	setImageBackground(image: string) {

		this.backgroundImage.onload = (event: any) => {

			this.isBackgroundImageLoaded = true;
		};

		this.backgroundImage.src = image;
	}

	draw(canvas: any, context: any) {

		context.strokeStyle = "black";
		context.lineWidth = 1;

		context.clearRect(0, 0, canvas.width, canvas.width);

		if (this.isBackgroundImageLoaded)
			context.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height);

		this.segments.forEach((segment: Segment) => segment.draw(canvas, context));
	}

	mouseMove(canvas: any, e: MouseEvent) {

		var location = this.getMousePosition(canvas, e);
		let segment = this.getSegmentByPoint(canvas, location);
		if (segment != null)
			segment.mouseMove(canvas, e);		

		this.updateMouseOver(segment, canvas, e);
	}

	private updateMouseOver(segment: Segment, canvas: any, e: MouseEvent) {

		if (segment == null) {

			if (this.segments != null)
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
		if (segment != null)
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
		if (segment != null)
			segment.mouseClick(canvas, e);
	}

	getSegmentByPoint(canvas: any, point: Point): Segment {

		let context = canvas.getContext('2d');
		let segments = this.segments.filter((segment) => segment.isPointInPath(canvas, context, point));

		if (segments.length != 1)
			return null;

		return segments[0];
	}
}