import { EventManager } from './../../event-aggregator/event-manager';

import { Shape } from './shape';
import { SegmentPart } from './segment-part';
import { Point } from './point';

import { EchoUtils } from './../utils/echo-utils';
import { SegmentScore } from './../utils/segment-score';
import { ScoreColorPair } from './../utils/score-color-pair';

export class Segment extends Shape {

	fill: string = 'blue';
	selectedScoreColorPair: ScoreColorPair = null;
	_scoreValueMap = new Array<ScoreColorPair>();
	_selectedIndex: number = 0;
	parts: Array<SegmentPart> = new Array<SegmentPart>();

	isMouseOver: boolean = false;

	constructor () {
		super();

		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Ak_Scar]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Akinetic]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Aneurysm]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Dis_Scar]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Dyskin]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.H_Score]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Hyperkin]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Hypokin]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Max]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Min]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.Normal]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.NotVis]));
		this._scoreValueMap.push(EchoUtils.getInstance().scoreColorPair.Item(SegmentScore[SegmentScore.UnableEv]));

		this.fill = this._scoreValueMap[this._selectedIndex].color;	
	}

	isPointInPath(canvas: any, context: any, point: Point): boolean {
		context.beginPath();
		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });
		context.closePath();

		return context.isPointInPath(point.x, point.y);
	}

	draw(canvas: any, context: any) {
		context.beginPath();
		context.fillStyle = this.fill;

		this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });

		context.closePath();
		context.stroke();
		context.fill();
	}

	mouseMove(canvas: any, e: MouseEvent) {
	}

	mouseEnter(canvas: any, e: MouseEvent) {
		this.isMouseOver = true;
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseLeave(canvas: any, e: MouseEvent) {
		this.isMouseOver = false;
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseUp(canvas: any, e: MouseEvent) {
		canvas.getContext('2d').fillStyle = 'blue';
		this.draw(canvas, canvas.getContext('2d'));
	}

	mouseWheel(canvas: any, e: MouseWheelEvent) {
		if (e.deltaY < 0 && this._selectedIndex < this._scoreValueMap.length - 1)
			this._selectedIndex++;
		if (e.deltaY > 0 && this._selectedIndex > 0)
			this._selectedIndex--;

		this.fill = this._scoreValueMap[this._selectedIndex].color;	
		this.selectedScoreColorPair = this._scoreValueMap[this._selectedIndex];
		this.draw(canvas, canvas.getContext('2d'));

		EventManager.getInstance().publish("segmentScoreChanged", { eventName: "segmentScoreChanged", scoreColorPair: this.selectedScoreColorPair });
	}

	mouseClick(canvas: any, e: MouseEvent) {
		if (this._selectedIndex < this._scoreValueMap.length - 1)
			this._selectedIndex++;
		else
			this._selectedIndex = 0;

		this.fill = this._scoreValueMap[this._selectedIndex].color;	
		this.selectedScoreColorPair = this._scoreValueMap[this._selectedIndex];
		this.draw(canvas, canvas.getContext('2d'));

		EventManager.getInstance().publish("segmentScoreChanged", { eventName: "segmentScoreChanged", scoreColorPair: this.selectedScoreColorPair });
	}
}