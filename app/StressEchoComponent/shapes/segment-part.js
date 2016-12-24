"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shape_1 = require('./shape');
var point_1 = require('./point');
var SegmentPart = (function (_super) {
    __extends(SegmentPart, _super);
    function SegmentPart() {
        _super.apply(this, arguments);
    }
    return SegmentPart;
}(shape_1.Shape));
exports.SegmentPart = SegmentPart;
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(points) {
        _super.call(this);
        this.points = points;
    }
    Object.defineProperty(Polygon.prototype, "Points", {
        get: function () {
            return this.points;
        },
        enumerable: true,
        configurable: true
    });
    Polygon.prototype.draw = function (canvas, context) {
        this.points.forEach(function (point) {
            context.lineTo(point.x, point.y);
        });
    };
    return Polygon;
}(SegmentPart));
exports.Polygon = Polygon;
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        _super.apply(this, arguments);
        this.startPoint = new point_1.Point(0, 0);
        this.endPoint = new point_1.Point(0, 0);
    }
    Line.prototype.draw = function (canvas, context) {
        context.moveTo(this.startPoint.x, this.startPoint.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
    };
    return Line;
}(SegmentPart));
exports.Line = Line;
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        _super.apply(this, arguments);
        this.centerPoint = new point_1.Point(0, 0);
        this.startPoint = new point_1.Point(0, 0);
        this.angle = 64;
    }
    Arc.prototype.draw = function (canvas, context) {
        var radius = this.getRadius(this.centerPoint, this.startPoint);
        var endPoint = this.getEndPoint(this.centerPoint, this.startPoint, this.angle);
        var startAngle = this.getStartAngle(this.angle);
        var endAngle = this.getEndAngle(this.centerPoint, this.startPoint);
        console.log('radius');
        console.log(radius);
        console.log('startPoint');
        console.log(this.startPoint);
        console.log('endPoint');
        console.log(endPoint);
        console.log('startAngle');
        console.log(startAngle);
        console.log('endAngle');
        console.log(endAngle);
        context.arc(this.centerPoint.x, this.centerPoint.y, radius, -startAngle, endAngle, this.direction.toLowerCase() == 'clockwise' ? true : false);
    };
    Arc.prototype.getStartAngle = function (degree) {
        var startAngle = 2 * Math.PI * degree / 360;
        return startAngle;
    };
    Arc.prototype.getEndAngle = function (centerPoint, startPoint) {
        var endAngle = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x);
        return endAngle;
    };
    Arc.prototype.getRadius = function (centerPoint, startPoint) {
        var radius = Math.sqrt(Math.pow(startPoint.y - centerPoint.y, 2) + Math.pow(startPoint.x - centerPoint.x, 2));
        return radius;
    };
    Arc.prototype.getEndPoint = function (centerPoint, startPoint, angle) {
        var radius = this.getRadius(centerPoint, startPoint);
        var angleRad = 2 * Math.PI * angle / 360;
        var b = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x) + angleRad;
        var endPoint = new point_1.Point(centerPoint.x + radius * Math.cos(b), centerPoint.y + radius * Math.sin(b));
        console.log('PROVA endPoint');
        console.log(endPoint);
        return endPoint;
    };
    return Arc;
}(SegmentPart));
exports.Arc = Arc;
//# sourceMappingURL=segment-part.js.map