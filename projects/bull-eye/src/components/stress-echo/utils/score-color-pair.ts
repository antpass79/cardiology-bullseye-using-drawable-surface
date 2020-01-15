import { SegmentScore } from './segment-score';

export class ScoreColorPair {

	constructor(public score: SegmentScore, public color: string) {
		this.description = SegmentScore[this.score];
	}

	description: string;
}