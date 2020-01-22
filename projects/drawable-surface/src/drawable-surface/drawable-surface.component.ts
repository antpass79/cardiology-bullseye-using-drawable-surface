import { Component, AfterContentInit, OnChanges, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

import { EventManager } from '../event-aggregator/event-manager';
import { Picture } from '../shapes/picture';
import { Transform } from '../shapes/transform';
import { ISurface } from '../shapes/shape';
import { PictureTransformFactory } from '../services/picture-trasform-factory';
import { ResizeMode } from './resize-mode';

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

	@Input()
	width: number;
	@Input()
	height: number;

	@Input()
	resizeMode: ResizeMode = ResizeMode.none;

	@ViewChild("drawableCanvas", { static: true })
    canvasElement: ElementRef<HTMLCanvasElement>;

	get canvas(): HTMLCanvasElement {
		return this.canvasElement.nativeElement;
	}
	get context(): CanvasRenderingContext2D {
		return this.canvas.getContext('2d');
	}
	private _transform: Transform = Transform.default();
	get transform(): Transform {
		return this._transform;
	}

	ngAfterContentInit() {
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
		this.updateTransform();
		this.draw();
	}

	public mouseMove(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseMove(this, e);			
		}
	}

	public mouseClick(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseClick(this, e);
			this.draw();
		}
	}

	public mouseDoubleClick(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseDoubleClick(this, e);
			this.draw();
		}
	}

	public mouseDown(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseDown(this, e);
			this.draw();
		}
	}

	public mouseUp(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseUp(this, e);
			this.draw();
		}
	}

	public mouseEnter(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseEnter(this, e);
			this.draw();
		}
	}

	public mouseLeave(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseLeave(this, e);
			this.draw();
		}
	}

	public mouseOver(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseOver(this, e);
			this.draw();
		}
	}

	public mouseWheel(e: MouseWheelEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseWheel(this, e);
			this.draw();
		}
	}

	private updateTransform() {
        let transform: Transform = Transform.default();
        if (!this.picture || !this.picture.isBackgroundImageLoaded) {
            return transform;
        }

		this._transform = PictureTransformFactory.create(this.picture, this.picture.backgroundImage, this.canvas, this.resizeMode)
	}

	private draw() {
		if (this.picture != null) {
			this.picture.draw(this);
		}
	}
}