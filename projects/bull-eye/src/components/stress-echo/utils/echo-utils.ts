import { ScoreColorPair } from './score-color-pair';
import { SegmentScore } from './segment-score';

export class EchoUtils {
 
    private static _instance: EchoUtils = new EchoUtils();
    public static getInstance(): EchoUtils {
        return EchoUtils._instance;
    }
 
    constructor () {

        if (EchoUtils._instance){
            throw new Error("Error: Instantiation failed: Use EchoUtils.getInstance() instead of new.");
        }

        EchoUtils._instance = this;

        this.scoreColorPair.set(SegmentScore[SegmentScore.Ak_Scar], (new ScoreColorPair(SegmentScore.Ak_Scar, 'orangered')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Akinetic], (new ScoreColorPair(SegmentScore.Akinetic, 'orange')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Aneurysm], (new ScoreColorPair(SegmentScore.Aneurysm, 'violet')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Dis_Scar], (new ScoreColorPair(SegmentScore.Dis_Scar, 'red')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Dyskin], (new ScoreColorPair(SegmentScore.Dyskin, 'greenyellow')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.H_Score], (new ScoreColorPair(SegmentScore.H_Score, 'sienna')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Hyperkin], (new ScoreColorPair(SegmentScore.Hyperkin, 'salmon')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Hypokin], (new ScoreColorPair(SegmentScore.Hypokin, 'aqua')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Max], (new ScoreColorPair(SegmentScore.Max, 'purple')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Min], (new ScoreColorPair(SegmentScore.Min, 'magenta')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.Normal], (new ScoreColorPair(SegmentScore.Normal, 'greenyellow')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.NotVis], (new ScoreColorPair(SegmentScore.NotVis, 'white')));
        this.scoreColorPair.set(SegmentScore[SegmentScore.UnableEv], (new ScoreColorPair(SegmentScore.UnableEv, 'brown')));
    }

    scoreColorPair = new Map<String, ScoreColorPair>();
}