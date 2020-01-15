import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';

import { EventManager } from './../../event-aggregator/event-manager';
import { BullEye } from './shapes/bull-eye';

@Component({
	selector: 'stress-echo',
	templateUrl: 'stress-echo.component.html',
	styleUrls: ['stress-echo.component.css']
})
export class StressEchoComponent implements OnInit, OnChanges {
	@Output()
	segmentScoreChanged = new EventEmitter();

	@Input()
	bullEye: BullEye;

	private canvas: any;
	private context: any;

	ngOnInit() {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		EventManager.getInstance().subscribe("segmentScoreChanged", (payload) => {
			this.segmentScoreChanged.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair });
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
			this.bullEye.draw(this.canvas, this.context);
		}
	}

	private mouseMove(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseMove(this.canvas, e);
		}
	}

	private mouseClick(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseClick(this.canvas, e);
		}
	}

	private mouseUp(e: MouseEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseUp(this.canvas, e);
		}
	}

	private mouseWheel(e: WheelEvent) {
		e.preventDefault();

		if (this.bullEye != null) {
			this.bullEye.mouseWheel(this.canvas, e);
		}
	}

}