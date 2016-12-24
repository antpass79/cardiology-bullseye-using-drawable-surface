"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_1 = require('./shape');
var BullEye = (function (_super) {
    __extends(BullEye, _super);
    function BullEye() {
        _super.apply(this, arguments);
        this.segments = new Array();
        this.backgroundImage = new Image();
        this.isBackgroundImageLoaded = false;
    }
    BullEye.prototype.setImageBackground = function (image) {
        var _this = this;
        this.backgroundImage.onload = function (event) {
            _this.isBackgroundImageLoaded = true;
        };
        this.backgroundImage.src = image;
    };
    BullEye.prototype.draw = function (canvas, context) {
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.clearRect(0, 0, canvas.width, canvas.width);
        if (this.isBackgroundImageLoaded)
            context.drawImage(this.backgroundImage, 0, 0, this.backgroundImage.width, this.backgroundImage.height);
        this.segments.forEach(function (segment) { return segment.draw(canvas, context); });
    };
    BullEye.prototype.mouseMove = function (canvas, e) {
        var location = this.getMousePosition(canvas, e);
        var segment = this.getSegmentByPoint(canvas, location);
        if (segment != null)
            segment.mouseMove(canvas, e);
        this.updateMouseOver(segment, canvas, e);
    };
    BullEye.prototype.updateMouseOver = function (segment, canvas, e) {
        if (segment == null) {
            if (this.segments != null)
                this.segments.forEach(function (segmentLeave) { return segmentLeave.mouseLeave(canvas, e); });
            return;
        }
        this.segments.forEach(function (segmentLeave) {
            if (segmentLeave.isMouseOver)
                segmentLeave.mouseLeave(canvas, e);
        });
        segment.mouseEnter(canvas, e);
    };
    BullEye.prototype.mouseUp = function (canvas, e) {
        var location = this.getMousePosition(canvas, e);
        var segment = this.getSegmentByPoint(canvas, location);
        if (segment != null)
            segment.mouseUp(canvas, e);
    };
    BullEye.prototype.mouseWheel = function (canvas, e) {
        var location = this.getMousePosition(canvas, e);
        var segment = this.getSegmentByPoint(canvas, location);
        if (segment != null)
            segment.mouseWheel(canvas, e);
    };
    BullEye.prototype.getSegmentByPoint = function (canvas, point) {
        var context = canvas.getContext('2d');
        var segments = this.segments.filter(function (segment) { return segment.isPointInPath(canvas, context, point); });
        if (segments.length != 1)
            return null;
        return segments[0];
    };
    return BullEye;
}(shape_1.Shape));
exports.BullEye = BullEye;
//# sourceMappingURL=bull-eye.js.map