import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';

import { EventManager } from './../../event-aggregator/event-manager';
import { Picture } from './shapes/picture';
import { Transform } from './utils/transform';
import { ISurface } from './shapes/shape';

@Component({
	selector: 'stress-echo',
	templateUrl: 'stress-echo.component.html',
	styleUrls: ['stress-echo.component.css']
})
export class StressEchoComponent implements ISurface, OnInit, OnChanges {
	@Output()
	segmentMouseWheel = new EventEmitter();
	@Output()
	segmentMouseClick = new EventEmitter();

	@Input()
	bullEye: Picture;

	private _canvas: HTMLCanvasElement;

	get canvas(): HTMLCanvasElement {
		return this._canvas;
	}
	get context(): CanvasRenderingContext2D {
		return this.canvas.getContext('2d');;
	}
	get transform(): Transform {
		let transform: Transform = Transform.default();

		if (this.bullEye && this.bullEye.backgroundImage) {
			let scale = Math.min(this.canvas.width / this.bullEye.backgroundImage.width, this.canvas.height / this.bullEye.backgroundImage.height);
			let x = (this.canvas.width / 2) - (this.bullEye.backgroundImage.width / 2) * scale;
			let y = (this.canvas.height / 2) - (this.bullEye.backgroundImage.height / 2) * scale;	
			transform = Transform.create(x, y, scale, scale);
		}

		return transform;
	}

	ngOnInit() {
		this._canvas = <HTMLCanvasElement>document.getElementById('canvas');

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
		if (this.bullEye != null) {
			this.bullEye.draw(this);
		}
	}

	private mouseMove(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseMove(this, e);			
		}
	}

	private mouseClick(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseClick(this, e);
			this.draw();
		}
	}

	private mouseUp(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseUp(this, e);
			this.draw();
		}
	}

	private mouseWheel(e: WheelEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseWheel(this, e);
			this.draw();
		}
	}
}