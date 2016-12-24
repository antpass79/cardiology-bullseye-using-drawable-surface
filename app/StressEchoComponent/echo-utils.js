"use strict";
var dictionary_1 = require('./dictionary');
var score_color_pair_1 = require('./score-color-pair');
var segment_score_1 = require('./segment-score');
var EchoUtils = (function () {
    function EchoUtils() {
        this.scoreColorPair = new dictionary_1.Dictionary();
        if (EchoUtils._instance) {
            throw new Error("Error: Instantiation failed: Use EchoUtils.getInstance() instead of new.");
        }
        EchoUtils._instance = this;
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Ak_Scar], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Ak_Scar, 'orangered')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Akinetic], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Akinetic, 'orange')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Aneurysm], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Aneurysm, 'violet')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Dis_Scar], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Dis_Scar, 'red')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Dyskin], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Dyskin, 'greenyellow')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.H_Score], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.H_Score, 'sienna')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Hyperkin], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Hyperkin, 'salmon')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Hypokin], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Hypokin, 'aqua')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Max], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Max, 'purple')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Min], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Min, 'magenta')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Normal], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.Normal, 'greenyellow')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.NotVis], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.NotVis, 'white')));
        this.scoreColorPair.Add(segment_score_1.SegmentScore[segment_score_1.SegmentScore.UnableEv], (new score_color_pair_1.ScoreColorPair(segment_score_1.SegmentScore.UnableEv, 'brown')));
    }
    EchoUtils.getInstance = function () {
        return EchoUtils._instance;
    };
    EchoUtils._instance = new EchoUtils();
    return EchoUtils;
}());
exports.EchoUtils = EchoUtils;
//# sourceMappingURL=echo-utils.js.map