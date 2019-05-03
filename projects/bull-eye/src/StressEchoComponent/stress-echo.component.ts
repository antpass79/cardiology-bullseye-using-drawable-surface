import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataService }  from './data.service';
import { X2JS }  from 'x2json';

import { ViewBox }  from './view-box';

import { Dictionary }  from './dictionary';
import { EventManager } from './../EventAggregator/event-manager';

import { Summary }  from './shapes/summary';
import { SummarySegment }  from './shapes/summary-segment';
import { Polygon, Line, Arc }  from './shapes/segment-part';
import { BullEye }  from './shapes/bull-eye';
import { Segment }  from './shapes/segment';
import { Point }  from './shapes/point';

@Component({
	
	moduleId: module.id,
	selector: 'stress-echo',
	templateUrl: 'stress-echo.component.html',
	styleUrls: ['stress-echo.component.css'],
	inputs: ['SelectedBullEye', 'BullEyeType']
})

export class StressEchoComponent implements OnInit {
	
	constructor(private dataService: DataService) {	}

	@Output() segmentScoreChanged = new EventEmitter();

	keyedCollection = new Dictionary<BullEye>();
	canvas: any;
	context: any;
	viewBox = new ViewBox();

    private _selectedBullEye: BullEye = null;
    get SelectedBullEye() : BullEye {
        return this._selectedBullEye;
    }
    set SelectedBullEye(selectedBullEye: BullEye) {
        this._selectedBullEye = selectedBullEye;
		//this.updateViewBox();
    }

    private _bullEyeType: string = 'ALAX_16';
    get BullEyeType(): string {
        return this._bullEyeType;
    }
    set BullEyeType(bullEyeType: string) {
        this._bullEyeType = bullEyeType;

		this.SelectedBullEye = this.keyedCollection.Item(bullEyeType);

		if (this.SelectedBullEye != null)
			this.SelectedBullEye.draw(this.canvas, this.context);
    }

	ngOnInit() {

		EventManager.getInstance().subscribe("segmentScoreChanged", (payload) => {

			this.segmentScoreChanged.emit({eventName: payload.eventName, scoreColorPair: payload.scoreColorPair});
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

		this.preLoadBullEyes();
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

	private preLoadBullEyes() {

		this.preLoad('twoC_16.xml');
		this.preLoad('twoC_17.xml');
		this.preLoad('fourC_16.xml');
		this.preLoad('fourC_17.xml');
		this.preLoad('ALAX_16.xml');
		this.preLoad('ALAX_17.xml');
		this.preLoad('LAX_16.xml');
		this.preLoad('LAX_17.xml');
		this.preLoad('SAX_AP_16.xml');
		this.preLoad('SAX_AP_17.xml');
		this.preLoad('SAX_MV_16.xml');
		this.preLoad('SAX_MV_17.xml');
		this.preLoad('SAX_PM_16.xml');
		this.preLoad('SAX_PM_17.xml');
		//this.preLoadSummary('Summary_16.xml');
	}

	private preLoad(filename: string): void {

		this.dataService.load(filename)
			.then((xml) => {

				var x2js = new X2JS();
				var json = x2js.xml_str2json(xml);
				
				var bullEye = this.exctractBullEye(json);

				let imageName = filename.replace('_16.xml', '').replace('_17.xml', '') + '.png';
				let image = './assets/images/' + imageName;
				bullEye.setImageBackground(image);

				let key = filename.slice(0, filename.indexOf('.xml'));
				this.keyedCollection.Add(key, bullEye);

				this.SelectedBullEye = bullEye;
			});
	}

	private preLoadSummary(filename: string): void {

		this.dataService.load(filename)
			.then((xml) => {
					
				var x2js = new X2JS();
				var json = x2js.xml_str2json(xml);
				
				var summary = this.exctractSummary(json);
				
				let imageName = filename.replace('_16.xml', '').replace('_17.xml', '');
				imageName = imageName + (filename.indexOf('6') != -1 ? '_6.png' : '.png');
				let image = './assets/images/' + imageName;
				//summary.setImageBackground(image);

				let key = filename.slice(0, filename.indexOf('.xml'));
				this.keyedCollection.Add(key, summary);

				this.SelectedBullEye = summary;
			});
	}

	private exctractBullEye(json: any): BullEye {

		let bullEye: BullEye = new BullEye();

		json.ViewDescriptor.SegmentCollection.SegmentItem.forEach((jsonSegment: any) => {

			let points = new Array<Point>();

			jsonSegment.Points.Point.forEach((jsonPoint: any) => {

				points.push(new Point(Number(jsonPoint.X), Number(jsonPoint.Y)));
			});

			let polygon = new Polygon(points);
			let segment = new Segment();
			segment.parts.push(polygon);
			bullEye.segments.push(segment);
		});

		return bullEye;
	}

	private exctractSummary(json: any): Summary {

		let summary = new Summary();

		json.ViewDescriptor.SegmentCollection.SegmentItem.forEach((jsonSegment: any) => {

			let summarySegment: SummarySegment = new SummarySegment();

			summarySegment.startPoint = new Point(Number(jsonSegment.StartPoint.Point.X), Number(jsonSegment.StartPoint.Point.Y));
			summarySegment.internalPoint = new Point(Number(jsonSegment.InternalPoints.X), Number(jsonSegment.InternalPoints.Y));

			jsonSegment.Points.forEach((jsonPoint: any) => {
				
				if (jsonPoint._type == 'line') {

					let line = new Line();
					line.startPoint = new Point (Number(jsonPoint.Point[0].X), Number(jsonPoint.Point[0].Y));
					line.endPoint = new Point (Number(jsonPoint.Point[1].X), Number(jsonPoint.Point[1].Y));
					summarySegment.parts.push(line);
				}
				if (jsonPoint._type == 'arc') {

					let arc = new Arc();
					arc.centerPoint = new Point (Number(jsonPoint.Center.Point.X), Number(jsonPoint.Center.Point.Y));
					arc.startPoint = new Point (Number(jsonPoint.Start.Point.X), Number(jsonPoint.Start.Point.Y));
					arc.angle = Number(jsonPoint.Angle);
					arc.direction = jsonPoint.Direction;
					summarySegment.parts.push(arc);
				}
			});

			summary.segments.push(summarySegment);
		});

		return summary;
	}
}