"use strict";
var segment_score_1 = require('./segment-score');
var ScoreColorPair = (function () {
    function ScoreColorPair(assignedScore, assignedColor) {
        this.assignedScore = assignedScore;
        this.assignedColor = assignedColor;
        this.score = assignedScore;
        this.color = assignedColor;
        this.description = segment_score_1.SegmentScore[assignedScore];
    }
    return ScoreColorPair;
}());
exports.ScoreColorPair = ScoreColorPair;
//# sourceMappingURL=score-color-pair.js.map