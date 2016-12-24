"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var echo_utils_1 = require('./../StressEchoComponent/echo-utils');
var Legend = (function () {
    function Legend() {
        this.scores = echo_utils_1.EchoUtils.getInstance().scoreColorPair.items;
        this.keys = echo_utils_1.EchoUtils.getInstance().scoreColorPair.Keys();
    }
    Legend.prototype.onSelect = function (key) {
        console.log(key);
    };
    Legend.prototype.getColor = function (key) {
        return echo_utils_1.EchoUtils.getInstance().scoreColorPair.Item(key).color;
    };
    Legend = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'legend',
            templateUrl: './legend.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Legend);
    return Legend;
}());
exports.Legend = Legend;
//# sourceMappingURL=legend.js.map