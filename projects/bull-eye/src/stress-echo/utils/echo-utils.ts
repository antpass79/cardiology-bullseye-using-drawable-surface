import { Dictionary } from './dictionary';
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

        this.scoreColorPair.Add(SegmentScore[SegmentScore.Ak_Scar], (new ScoreColorPair(SegmentScore.Ak_Scar, 'orangered')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Akinetic], (new ScoreColorPair(SegmentScore.Akinetic, 'orange')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Aneurysm], (new ScoreColorPair(SegmentScore.Aneurysm, 'violet')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Dis_Scar], (new ScoreColorPair(SegmentScore.Dis_Scar, 'red')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Dyskin], (new ScoreColorPair(SegmentScore.Dyskin, 'greenyellow')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.H_Score], (new ScoreColorPair(SegmentScore.H_Score, 'sienna')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Hyperkin], (new ScoreColorPair(SegmentScore.Hyperkin, 'salmon')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Hypokin], (new ScoreColorPair(SegmentScore.Hypokin, 'aqua')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Max], (new ScoreColorPair(SegmentScore.Max, 'purple')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Min], (new ScoreColorPair(SegmentScore.Min, 'magenta')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.Normal], (new ScoreColorPair(SegmentScore.Normal, 'greenyellow')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.NotVis], (new ScoreColorPair(SegmentScore.NotVis, 'white')));
        this.scoreColorPair.Add(SegmentScore[SegmentScore.UnableEv], (new ScoreColorPair(SegmentScore.UnableEv, 'brown')));
    }

    scoreColorPair = new Dictionary<ScoreColorPair>();
}