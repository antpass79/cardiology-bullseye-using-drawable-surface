import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { DataService } from './utils/data.service';
import { X2JS } from 'x2json';

import { ViewBox } from './utils/view-box';

import { Dictionary } from './utils/dictionary';
import { EventManager } from './../event-aggregator/event-manager';

import { Summary } from './shapes/summary';
import { SummarySegment } from './shapes/summary-segment';
import { Polygon, Line, Arc } from './shapes/segment-part';
import { BullEye } from './shapes/bull-eye';
import { Segment } from './shapes/segment';
import { Point } from './shapes/point';

@Component({
	selector: 'stress-echo',
	templateUrl: 'stress-echo.component.html',
	styleUrls: ['stress-echo.component.css']
})
export class StressEchoComponent implements OnInit {

	constructor(dataService: DataService) {
		this.keyedCollection = dataService.bullEyes;
	}

	@Output() segmentScoreChanged = new EventEmitter();

	keyedCollection = new Dictionary<BullEye>();
	canvas: any;
	context: any;
	viewBox = new ViewBox();

	private _selectedBullEye: BullEye = null;
	get SelectedBullEye(): BullEye {
		return this._selectedBullEye;
	}
	@Input()
	set SelectedBullEye(selectedBullEye: BullEye) {
		this._selectedBullEye = selectedBullEye;
		//this.updateViewBox();
	}

	private _bullEyeType: string = 'ALAX_16';
	get BullEyeType(): string {
		return this._bullEyeType;
	}
	@Input()
	set BullEyeType(bullEyeType: string) {
		this._bullEyeType = bullEyeType;

		this.SelectedBullEye = this.keyedCollection.Item(bullEyeType);

		if (this.SelectedBullEye != null)
			this.SelectedBullEye.draw(this.canvas, this.context);
	}

	ngOnInit() {
		EventManager.getInstance().subscribe("segmentScoreChanged", (payload) => {
			this.segmentScoreChanged.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair });
		});

		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
			e.preventDefault();

			if (this.SelectedBullEye != null)
				this.SelectedBullEye.mouseMove(this.canvas, e);

		}, false);

		this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
		}, false);


		this.canvas.addEventListener('mousewheel', (e: MouseWheelEvent) => {
			e.preventDefault();

			if (this.SelectedBullEye != null)
				this.SelectedBullEye.mouseWheel(this.canvas, e);

		}, false);
	}

	private updateViewBox() {
		if (this._selectedBullEye == null)
			return;

		this._selectedBullEye.segments.forEach((segment) => {

			segment.parts[0].Points.forEach((point) => {

				if (this.viewBox.minX > point.x)
					this.viewBox.minX = point.x;

				if (this.viewBox.maxX < point.x)
					this.viewBox.maxX = point.x;

				if (this.viewBox.minY > point.y)
					this.viewBox.minY = point.y;

				if (this.viewBox.maxY < point.y)
					this.viewBox.maxY = point.y;
			});
		});
	}
}