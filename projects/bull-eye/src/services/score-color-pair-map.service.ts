import { Injectable } from '@angular/core';
import { IShape, CompositeShape, ISurface } from '@antpass79/drawable-surface';

export enum SegmentScore
{
    NotVis = -1,
    Dis_Scar = 6,
    Ak_Scar = 7,
    Aneurysm = 5,
    Dyskin = 4,
    Akinetic = 3,
    Hypokin = 2,
    Normal = 1,
    UnableEv = 0,

    Hyperkin = 8,
    H_Score = -2,

    //extended scores
    Min = 100,
    Max = 101
}

export class ScoreColorSegment extends CompositeShape {
    private _scoreColorPair: ScoreColorPair = new ScoreColorPair(SegmentScore.Normal, 'greenyellow');
    get scoreColorPair(): ScoreColorPair {
        return this._scoreColorPair;
    }
    set scoreColorPair(scoreColorPair: ScoreColorPair) {
        this._scoreColorPair = scoreColorPair;
        this.appearance.fill = this.scoreColorPair.color;
    }
}

export class ScoreColorPair {
	private _description: String;
	get description(): String {
		return this._description;
	}
	private _color: string;
	get color(): string {
		return this._color;
	}

	constructor(public score: SegmentScore, color: string) {
		this._description = SegmentScore[this.score];
		this._color = color;
    }    
}

@Injectable({
    providedIn: 'root',
})
export class ScoreColorPairMapService {
    private _scoreColorPairMap = new Map<String, ScoreColorPair>();

    private _scores;
    get scores(): String[] {
        return this._scores;
    }
    private _scoreColorPairs;
    get scoreColorPairs(): ScoreColorPair[] {
        return this._scoreColorPairs;
    }
  
    constructor () {
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Ak_Scar], new ScoreColorPair(SegmentScore.Ak_Scar, 'orangered'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Akinetic], new ScoreColorPair(SegmentScore.Akinetic, 'orange'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Aneurysm], new ScoreColorPair(SegmentScore.Aneurysm, 'violet'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Dis_Scar], new ScoreColorPair(SegmentScore.Dis_Scar, 'red'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Dyskin], new ScoreColorPair(SegmentScore.Dyskin, 'greenyellow'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.H_Score], new ScoreColorPair(SegmentScore.H_Score, 'sienna'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Hyperkin], new ScoreColorPair(SegmentScore.Hyperkin, 'salmon'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Hypokin], new ScoreColorPair(SegmentScore.Hypokin, 'aqua'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Max], new ScoreColorPair(SegmentScore.Max, 'purple'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Min], new ScoreColorPair(SegmentScore.Min, 'magenta'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.Normal], new ScoreColorPair(SegmentScore.Normal, 'greenyellow'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.NotVis], new ScoreColorPair(SegmentScore.NotVis, 'white'));
        this._scoreColorPairMap.set(SegmentScore[SegmentScore.UnableEv], new ScoreColorPair(SegmentScore.UnableEv, 'brown'));

        this._scores = Array.from(this._scoreColorPairMap.keys());
        this._scoreColorPairs = Array.from(this._scoreColorPairMap.values());
    }
}