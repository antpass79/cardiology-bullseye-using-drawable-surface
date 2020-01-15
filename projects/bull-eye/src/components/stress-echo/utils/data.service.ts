import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { X2JS } from 'x2json';
import { BullEye } from '../shapes/bull-eye';
import { Line, Arc, Polygon } from '../shapes/segment-part';
import { Point } from '../shapes/point';
import { SummarySegment } from '../shapes/summary-segment';
import { Summary } from '../shapes/summary';
import { Segment } from '../shapes/segment';

@Injectable()
export class DataService {

	private _bullEyes = new Map<String, BullEye>();
	get bullEyes(): Map<String, BullEye> {
		return this._bullEyes;
	}

	constructor(private http: Http) {
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
				var json = x2js.xml_str2json(xml);

				var bullEye = this.exctractBullEye(json);

				let imageName = filename.replace('_16.xml', '').replace('_17.xml', '') + '.png';
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
				var json = x2js.xml_str2json(xml);

				var summary = this.exctractSummary(json);

				let imageName = filename.replace('_16.xml', '').replace('_17.xml', '');
				imageName = imageName + (filename.indexOf('6') != -1 ? '_6.png' : '.png');
				let image = './assets/images/' + imageName;
				//summary.setImageBackground(image);

				let key = filename.slice(0, filename.indexOf('.xml'));
				this._bullEyes.set(key, summary);
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
					line.startPoint = new Point(Number(jsonPoint.Point[0].X), Number(jsonPoint.Point[0].Y));
					line.endPoint = new Point(Number(jsonPoint.Point[1].X), Number(jsonPoint.Point[1].Y));
					summarySegment.parts.push(line);
				}
				if (jsonPoint._type == 'arc') {

					let arc = new Arc();
					arc.centerPoint = new Point(Number(jsonPoint.Center.Point.X), Number(jsonPoint.Center.Point.Y));
					arc.startPoint = new Point(Number(jsonPoint.Start.Point.X), Number(jsonPoint.Start.Point.Y));
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
