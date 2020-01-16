import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { X2JS } from 'x2json';
import { BullEye } from '../components/stress-echo/shapes/bull-eye';
import { Line, Arc } from '../components/stress-echo/shapes/segment-part';
import { SummarySegment } from '../components/stress-echo/shapes/summary-segment';
import { Summary } from '../components/stress-echo/shapes/summary';
import { ViewDescriptor, SegmentItem } from './drawing-map-models';
import { SegmentBuilderFactoryService } from './segment-builder-factory.service';

export enum BullEyeType {
	
	twoC_16 = 10,
	twoC_17 = 15,
	fourC_16 = 20,
	fourC_17 = 25,
	ALAX_16 = 30,
	ALAX_17 = 35,
	LAX_16 = 40,
	LAX_17 = 45,
	SAX_AP_16 = 50,
	SAX_AP_17 = 55,
	SAX_MV_16 = 60,
	SAX_MV_17 = 65,
	SAX_PM_16 = 70,
	SAX_PM_17 = 75,
	Summary_16 = 80,
	Summary_17 = 85,
	Summary_6 = 90
}

@Injectable({
    providedIn: 'root',
})
export class DrawableMapDataService {

	private _bullEyes = new Map<String, BullEye>();
	get bullEyes(): Map<String, BullEye> {
		return this._bullEyes;
	}

	constructor(private http: Http, private segmentBuilderFactoryService: SegmentBuilderFactoryService) {
	}

	public async preLoadBullEyes(): Promise<void> {
		await this.preLoad('twoC_16.xml');
		await this.preLoad('twoC_17.xml');
		await this.preLoad('fourC_16.xml');
		await this.preLoad('fourC_17.xml');
		await this.preLoad('ALAX_16.xml');
		await this.preLoad('ALAX_17.xml');
		await this.preLoad('LAX_16.xml');
		await this.preLoad('LAX_17.xml');
		await this.preLoad('SAX_AP_16.xml');
		await this.preLoad('SAX_AP_17.xml');
		await this.preLoad('SAX_MV_16.xml');
		await this.preLoad('SAX_MV_17.xml');
		await this.preLoad('SAX_PM_16.xml');
		await this.preLoad('SAX_PM_17.xml');
		//this.preLoadSummary('Summary_16.xml');

		return Promise.resolve();
	}

	private preLoad(filename: string): Promise<any> {
		return this.load(filename)
			.then((xml) => {

				var x2js = new X2JS();
				let viewDescriptor: ViewDescriptor = x2js.xml_str2json(xml).ViewDescriptor;

				var bullEye = this.exctractBullEye(viewDescriptor);

				let imageName = viewDescriptor.PathImg + '.png';
				let image = './assets/images/' + imageName;
				bullEye.setImageBackground(image);

				let key = filename.slice(0, filename.indexOf('.xml'));
				this._bullEyes.set(key, bullEye);
			});
	}

	private load(filename: string): Promise<any> {
		return this.http
			.get('./assets/data/' + filename)
			.toPromise()
			.then(response => response.text());
	}

	private preLoadSummary(filename: string): Promise<any> {
		return this.load(filename)
			.then((xml) => {

				var x2js = new X2JS();
				let viewDescriptor: ViewDescriptor = x2js.xml_str2json(xml).ViewDescriptor;

				var summary = this.exctractSummary(viewDescriptor);

				let imageName = viewDescriptor.PathImg + '.png';
				let image = './assets/images/' + imageName;
				//summary.setImageBackground(image);

				let key = filename.slice(0, filename.indexOf('.xml'));
				this._bullEyes.set(key, summary);
			});
	}

	private exctractBullEye(viewDescriptor: ViewDescriptor): BullEye {
		let bullEye: BullEye = new BullEye();

		viewDescriptor.SegmentCollection.SegmentItem.forEach((segmentItem: SegmentItem) => {
			let segmentBuilder = this.segmentBuilderFactoryService.create(segmentItem.Points._type);
			let segment = segmentBuilder.build(segmentItem.Points);
			bullEye.segments.push(segment);
		});

		return bullEye;
	}

	private exctractSummary(viewDescriptor: ViewDescriptor): Summary {
		let summary = new Summary();

		viewDescriptor.SegmentCollection.SegmentItem.forEach((jsonSegment: any) => {

			let summarySegment: SummarySegment = new SummarySegment();

			summarySegment.startPoint = {
				X: Number(jsonSegment.StartPoint.Point.X),
				Y: Number(jsonSegment.StartPoint.Point.Y)
			};
			summarySegment.internalPoint = {
				X: Number(jsonSegment.InternalPoints.X),
				Y: Number(jsonSegment.InternalPoints.Y)
			};

			jsonSegment.Points.forEach((jsonPoint: any) => {

				if (jsonPoint._type == 'line') {

					let line = new Line();
					line.startPoint = {
						X: Number(jsonPoint.Point[0].X),
						Y: Number(jsonPoint.Point[0].Y)
					};
					line.endPoint = {
						X: Number(jsonPoint.Point[1].X),
						Y: Number(jsonPoint.Point[1].Y)
					};
					summarySegment.parts.push(line);
				}
				if (jsonPoint._type == 'arc') {

					let arc = new Arc();
					arc.centerPoint = {
						X: Number(jsonPoint.Center.Point.X),
						Y: Number(jsonPoint.Center.Point.Y)
					};
					arc.startPoint = {
						X: Number(jsonPoint.Start.Point.X),
						Y: Number(jsonPoint.Start.Point.Y)
					};
					arc.angle = Number(jsonPoint.Angle);
					arc.direction = jsonPoint.Direction;
					summarySegment.parts.push(arc);
				}
			});

			summary.segments.push(summarySegment);
		});

		return summary;
	}
};
