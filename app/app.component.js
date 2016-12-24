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
var bull_eye_type_1 = require('./StressEchoComponent/bull-eye-type');
var AppComponent = (function () {
    function AppComponent() {
        this.bullEyeTypes = bull_eye_type_1.BullEyeType;
        this.keys = Object.keys(this.bullEyeTypes).filter(Number);
        this.events = new Array();
    }
    AppComponent.prototype.onSelect = function (key) {
        this.selectedBullEyeType = bull_eye_type_1.BullEyeType[key];
    };
    AppComponent.prototype.onClear = function () {
        this.events = new Array();
    };
    AppComponent.prototype.onSegmentScoreChanged = function (payload) {
        this.events.push(payload.scoreColorPair.description);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map