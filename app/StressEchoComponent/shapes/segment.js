"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var event_manager_1 = require('./../../EventAggregator/event-manager');
var shape_1 = require('./shape');
var echo_utils_1 = require('./../echo-utils');
var segment_score_1 = require('./../segment-score');
var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment() {
        _super.call(this);
        this.fill = 'blue';
        this.selectedScoreColorPair = null;
        this._scoreValueMap = new Array();
        this._selectedIndex = 0;
        this.parts = new Array();
        this.isMouseOver = false;
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Ak_Scar]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Akinetic]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Aneurysm]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Dis_Scar]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Dyskin]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.H_Score]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Hyperkin]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Hypokin]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Max]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Min]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.Normal]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.NotVis]));
        this._scoreValueMap.push(echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(segment_score_1.SegmentScore[segment_score_1.SegmentScore.UnableEv]));
        this.fill = this._scoreValueMap[this._selectedIndex].color;
    }
    Segment.prototype.isPointInPath = function (canvas, context, point) {
        context.beginPath();
        this.parts.forEach(function (part) { part.draw(canvas, context); });
        context.closePath();
        return context.isPointInPath(point.x, point.y);
    };
    Segment.prototype.draw = function (canvas, context) {
        context.beginPath();
        context.fillStyle = this.fill;
        this.parts.forEach(function (part) { part.draw(canvas, context); });
        context.closePath();
        context.stroke();
        context.fill();
    };
    Segment.prototype.mouseMove = function (canvas, e) {
    };
    Segment.prototype.mouseEnter = function (canvas, e) {
        this.isMouseOver = true;
        this.draw(canvas, canvas.getContext('2d'));
    };
    Segment.prototype.mouseLeave = function (canvas, e) {
        this.isMouseOver = false;
        this.draw(canvas, canvas.getContext('2d'));
    };
    Segment.prototype.mouseUp = function (canvas, e) {
        canvas.getContext('2d').fillStyle = 'blue';
        this.draw(canvas, canvas.getContext('2d'));
    };
    Segment.prototype.mouseWheel = function (canvas, e) {
        if (e.wheelDelta > 0 && this._selectedIndex < this._scoreValueMap.length - 1)
            this._selectedIndex++;
        if (e.wheelDelta < 0 && this._selectedIndex > 0)
            this._selectedIndex--;
        this.fill = this._scoreValueMap[this._selectedIndex].color;
        this.selectedScoreColorPair = this._scoreValueMap[this._selectedIndex];
        this.draw(canvas, canvas.getContext('2d'));
        event_manager_1.EventManager.getInstance().publish("segmentScoreChanged", { eventName: "segmentScoreChanged", scoreColorPair: this.selectedScoreColorPair });
    };
    return Segment;
}(shape_1.Shape));
exports.Segment = Segment;
//# sourceMappingURL=segment.js.map