"use strict";
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getPoint = function () {
        return [this.x, this.y];
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=point.js.map