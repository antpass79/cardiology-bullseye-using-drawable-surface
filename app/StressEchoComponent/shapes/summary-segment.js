"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var point_1 = require('./point');
var segment_1 = require('./segment');
var SummarySegment = (function (_super) {
    __extends(SummarySegment, _super);
    function SummarySegment() {
        _super.apply(this, arguments);
        this.startPoint = new point_1.Point(0, 0);
        this.internalPoint = new point_1.Point(0, 0);
    }
    SummarySegment.prototype.draw = function (canvas, context) {
        context.beginPath();
        context.fillStyle = this.fill;
        context.moveTo(this.startPoint.x, this.startPoint.y);
        // this.parts[0].draw(canvas, context);
        // this.parts[1].draw(canvas, context);
        // this.parts[2].draw(canvas, context);
        this.parts[2].draw(canvas, context);
        //this.parts.forEach((part: SegmentPart) => { part.draw(canvas, context) });
        context.closePath();
        context.stroke();
        context.fill();
    };
    return SummarySegment;
}(segment_1.Segment));
exports.SummarySegment = SummarySegment;
//# sourceMappingURL=summary-segment.js.map