import { SegmentScore } from './segment-score';

export class ScoreColorPair {

	constructor (private assignedScore: SegmentScore, private assignedColor: string) {

		this.score = assignedScore;
		this.color = assignedColor;
        this.description = SegmentScore[assignedScore];
	}

	score: SegmentScore;
	color: string;
    description: string;
}