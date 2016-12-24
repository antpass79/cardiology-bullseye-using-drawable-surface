"use strict";
(function (SegmentScore) {
    SegmentScore[SegmentScore["NotVis"] = -1] = "NotVis";
    SegmentScore[SegmentScore["Dis_Scar"] = 6] = "Dis_Scar";
    SegmentScore[SegmentScore["Ak_Scar"] = 7] = "Ak_Scar";
    SegmentScore[SegmentScore["Aneurysm"] = 5] = "Aneurysm";
    SegmentScore[SegmentScore["Dyskin"] = 4] = "Dyskin";
    SegmentScore[SegmentScore["Akinetic"] = 3] = "Akinetic";
    SegmentScore[SegmentScore["Hypokin"] = 2] = "Hypokin";
    SegmentScore[SegmentScore["Normal"] = 1] = "Normal";
    SegmentScore[SegmentScore["UnableEv"] = 0] = "UnableEv";
    SegmentScore[SegmentScore["Hyperkin"] = 8] = "Hyperkin";
    SegmentScore[SegmentScore["H_Score"] = -2] = "H_Score";
    //extended scores
    SegmentScore[SegmentScore["Min"] = 100] = "Min";
    SegmentScore[SegmentScore["Max"] = 101] = "Max";
})(exports.SegmentScore || (exports.SegmentScore = {}));
var SegmentScore = exports.SegmentScore;
//# sourceMappingURL=segment-score.js.map