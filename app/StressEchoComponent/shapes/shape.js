"use strict";
var point_1 = require('./point');
var Shape = (function () {
    function Shape() {
    }
    Shape.prototype.draw = function (canvas, context) { };
    Shape.prototype.mouseUp = function (canvas, e) { };
    Shape.prototype.getMousePosition = function (canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return new point_1.Point(e.clientX - rect.left, e.clientY - rect.top);
    };
    Object.defineProperty(Shape.prototype, "Points", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.isPointInside = function (canvas, points, location) {
        var context = canvas.getContext('2d');
        context.beginPath();
        for (var i = 0; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        return context.isPointInPath(location.x, location.y);
    };
    return Shape;
}());
exports.Shape = Shape;
//# sourceMappingURL=shape.js.map