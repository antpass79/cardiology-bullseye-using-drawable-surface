import { Component, AfterContentInit, OnChanges, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

import { EventManager } from '../event-aggregator/event-manager';
import { Picture } from '../shapes/picture';
import { Transform } from '../utils/transform';
import { ISurface } from '../shapes/shape';

@Component({
	selector: 'drawable-surface',
	templateUrl: 'drawable-surface.component.html',
	styleUrls: ['drawable-surface.component.css']
})
export class DrawableSurfaceComponent implements ISurface, AfterContentInit, OnChanges {
	@Output()
	shapeMouseMove = new EventEmitter();
	@Output()
	shapeMouseClick = new EventEmitter();
	@Output()
	shapeMouseDoubleClick = new EventEmitter();
	@Output()
	shapeMouseDown = new EventEmitter();
	@Output()
	shapeMouseUp = new EventEmitter();
	@Output()
	shapeMouseEnter = new EventEmitter();
	@Output()
	shapeMouseLeave = new EventEmitter();
	@Output()
	shapeMouseOver = new EventEmitter();
	@Output()
	shapeMouseWheel = new EventEmitter();

	@Input()
	picture: Picture;

	@ViewChild("drawableCanvas", { static: true })
    canvasElement: ElementRef<HTMLCanvasElement>;

	get canvas(): HTMLCanvasElement {
		return this.canvasElement.nativeElement;
	}
	get context(): CanvasRenderingContext2D {
		return this.canvas.getContext('2d');;
	}
	get transform(): Transform {
		let transform: Transform = Transform.default();

		if (this.picture && this.picture.backgroundImage) {
			let scale = Math.min(this.canvas.width / this.picture.backgroundImage.width, this.canvas.height / this.picture.backgroundImage.height);
			let x = (this.canvas.width / 2) - (this.picture.backgroundImage.width / 2) * scale;
			let y = (this.canvas.height / 2) - (this.picture.backgroundImage.height / 2) * scale;	
			transform = Transform.create(x, y, scale, scale);
		}

		return transform;
	}

	ngAfterContentInit() {
		this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
			this.mouseMove(e);
		}, false);
		this.canvas.addEventListener('click', (e: MouseEvent) => {
			this.mouseClick(e);
		}, false);
		this.canvas.addEventListener('dblclick', (e: MouseEvent) => {
			this.mouseDoubleClick(e);
		}, false);
		this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
			this.mouseDown(e);
		}, false);
		this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
			this.mouseUp(e);
		}, false);
		this.canvas.addEventListener('mouseenter', (e: MouseEvent) => {
			this.mouseEnter(e);
		}, false);
		this.canvas.addEventListener('mouseleave', (e: MouseEvent) => {
			this.mouseLeave(e);
		}, false);
		this.canvas.addEventListener('mouseover', (e: MouseEvent) => {
			this.mouseOver(e);
		}, false);
		this.canvas.addEventListener('mousewheel', (e: MouseWheelEvent) => {
			this.mouseWheel(e);
		}, false);

		EventManager.getInstance().subscribe("shapeMouseMove", (payload) => {
			this.shapeMouseMove.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseClick", (payload) => {
			this.shapeMouseClick.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseDoubleClick", (payload) => {
			this.shapeMouseDoubleClick.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseDown", (payload) => {
			this.shapeMouseDown.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseUp", (payload) => {
			this.shapeMouseUp.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseEnter", (payload) => {
			this.shapeMouseEnter.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseLeave", (payload) => {
			this.shapeMouseLeave.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseOver", (payload) => {
			this.shapeMouseOver.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("shapeMouseWheel", (payload) => {
			this.shapeMouseWheel.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, shape: payload.shape, mouseEvent: payload.mouseEvent });
		});
	}

	ngOnChanges() {
		this.draw();
	}

	private draw() {
		if (this.picture != null) {
			this.picture.draw(this);
		}
	}

	private mouseMove(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseMove(this, e);			
		}
	}

	private mouseClick(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseClick(this, e);
			this.draw();
		}
	}

	private mouseDoubleClick(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseDoubleClick(this, e);
			this.draw();
		}
	}

	private mouseDown(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseDown(this, e);
			this.draw();
		}
	}

	private mouseUp(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseUp(this, e);
			this.draw();
		}
	}

	private mouseEnter(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseEnter(this, e);
			this.draw();
		}
	}

	private mouseLeave(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseLeave(this, e);
			this.draw();
		}
	}

	private mouseOver(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseOver(this, e);
			this.draw();
		}
	}

	private mouseWheel(e: MouseWheelEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseWheel(this, e);
			this.draw();
		}
	}
}