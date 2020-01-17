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
	segmentMouseWheel = new EventEmitter();
	@Output()
	segmentMouseClick = new EventEmitter();

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
		EventManager.getInstance().subscribe("segmentMouseWheel", (payload) => {
			this.segmentMouseWheel.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, segment: payload.segment, mouseEvent: payload.mouseEvent });
		});
		EventManager.getInstance().subscribe("segmentMouseClick", (payload) => {
			this.segmentMouseClick.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair, segment: payload.segment, mouseEvent: payload.mouseEvent });
		});

		this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
			this.mouseMove(e);
		}, false);
		this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
			this.mouseUp(e);
		}, false);
		this.canvas.addEventListener('mousewheel', (e: MouseWheelEvent) => {
			this.mouseWheel(e);
		}, false);
		this.canvas.addEventListener('click', (e: MouseEvent) => {
			this.mouseClick(e);
		}, false);
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

	private mouseUp(e: MouseEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseUp(this, e);
			this.draw();
		}
	}

	private mouseWheel(e: WheelEvent) {
		e.preventDefault();

		if (this.picture != null) {
			this.picture.mouseWheel(this, e);
			this.draw();
		}
	}
}