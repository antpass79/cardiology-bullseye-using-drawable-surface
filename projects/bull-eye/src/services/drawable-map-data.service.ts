import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { X2JS } from 'x2json';
import { BullEye } from '../components/stress-echo/shapes/bull-eye';
import { ViewDescriptor, SegmentItem } from './drawing-map-models';
import { SegmentBuilder } from './segment-builders';
import { ScoreColorPair, SegmentScore, ScoreColorPairMapService } from '../components/stress-echo/services/score-color-pair-map.service';

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

	constructor(private http: Http, private scoreColorPairMapService: ScoreColorPairMapService, private segmentBuilder: SegmentBuilder) {
	}

	public async preLoadDrawableMaps(): Promise<void> {
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
		await this.preLoad('Summary_16.xml');
		//this.preLoadSummary('Summary_16.xml');

		return Promise.resolve();
	}

	private preLoad(filename: string): Promise<any> {
		return this.load(filename)
			.then((xml) => {
				var x2js = new X2JS();
				let viewDescriptor: ViewDescriptor = x2js.xml_str2json(xml).ViewDescriptor;

				var bullEye = this.exctractDrawableMap(viewDescriptor);

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

	private exctractDrawableMap(viewDescriptor: ViewDescriptor): BullEye {
		let bullEye: BullEye = new BullEye();

		viewDescriptor.SegmentCollection.SegmentItem.forEach((segmentItem: SegmentItem) => {
			let segment = this.segmentBuilder.build(segmentItem);
			segment.scoreColorPair = this.scoreColorPairMapService.scoreColorPairs.find(scoreColorPair => scoreColorPair.score === SegmentScore.Normal);
			bullEye.segments.push(segment);
		});

		return bullEye;
	}
};
