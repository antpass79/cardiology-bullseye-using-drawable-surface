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
var data_service_1 = require('./data.service');
var x2json_1 = require('x2json');
var view_box_1 = require('./view-box');
var dictionary_1 = require('./dictionary');
var event_manager_1 = require('./../EventAggregator/event-manager');
var summary_1 = require('./shapes/summary');
var summary_segment_1 = require('./shapes/summary-segment');
var segment_part_1 = require('./shapes/segment-part');
var bull_eye_1 = require('./shapes/bull-eye');
var segment_1 = require('./shapes/segment');
var point_1 = require('./shapes/point');
var StressEchoComponent = (function () {
    function StressEchoComponent(dataService) {
        this.dataService = dataService;
        this.segmentScoreChanged = new core_1.EventEmitter();
        this.keyedCollection = new dictionary_1.Dictionary();
        this.viewBox = new view_box_1.ViewBox();
        this._selectedBullEye = null;
        this._bullEyeType = 'ALAX_16';
    }
    Object.defineProperty(StressEchoComponent.prototype, "SelectedBullEye", {
        get: function () {
            return this._selectedBullEye;
        },
        set: function (selectedBullEye) {
            this._selectedBullEye = selectedBullEye;
            //this.updateViewBox();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StressEchoComponent.prototype, "BullEyeType", {
        get: function () {
            return this._bullEyeType;
        },
        set: function (bullEyeType) {
            this._bullEyeType = bullEyeType;
            this.SelectedBullEye = this.keyedCollection.Item(bullEyeType);
            if (this.SelectedBullEye != null)
                this.SelectedBullEye.draw(this.canvas, this.context);
        },
        enumerable: true,
        configurable: true
    });
    StressEchoComponent.prototype.ngOnInit = function () {
        var _this = this;
        event_manager_1.EventManager.getInstance().subscribe("segmentScoreChanged", function (payload) {
            _this.segmentScoreChanged.emit({ eventName: payload.eventName, scoreColorPair: payload.scoreColorPair });
        });
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if (_this.SelectedBullEye != null)
                _this.SelectedBullEye.mouseMove(_this.canvas, e);
        }, false);
        this.canvas.addEventListener('mouseup', function (e) {
        }, false);
        this.canvas.addEventListener('mousewheel', function (e) {
            e.preventDefault();
            if (_this.SelectedBullEye != null)
                _this.SelectedBullEye.mouseWheel(_this.canvas, e);
        }, false);
        this.preLoadBullEyes();
    };
    StressEchoComponent.prototype.updateViewBox = function () {
        var _this = this;
        if (this._selectedBullEye == null)
            return;
        this._selectedBullEye.segments.forEach(function (segment) {
            segment.parts[0].Points.forEach(function (point) {
                if (_this.viewBox.minX > point.x)
                    _this.viewBox.minX = point.x;
                if (_this.viewBox.maxX < point.x)
                    _this.viewBox.maxX = point.x;
                if (_this.viewBox.minY > point.y)
                    _this.viewBox.minY = point.y;
                if (_this.viewBox.maxY < point.y)
                    _this.viewBox.maxY = point.y;
            });
        });
    };
    StressEchoComponent.prototype.preLoadBullEyes = function () {
        this.preLoad('twoC_16.xml');
        this.preLoad('twoC_17.xml');
        this.preLoad('fourC_16.xml');
        this.preLoad('fourC_17.xml');
        this.preLoad('ALAX_16.xml');
        this.preLoad('ALAX_17.xml');
        this.preLoad('LAX_16.xml');
        this.preLoad('LAX_17.xml');
        this.preLoad('SAX_AP_16.xml');
        this.preLoad('SAX_AP_17.xml');
        this.preLoad('SAX_MV_16.xml');
        this.preLoad('SAX_MV_17.xml');
        this.preLoad('SAX_PM_16.xml');
        this.preLoad('SAX_PM_17.xml');
        //this.preLoadSummary('Summary_16.xml');
    };
    StressEchoComponent.prototype.preLoad = function (filename) {
        var _this = this;
        this.dataService.load(filename)
            .then(function (xml) {
            var x2js = new x2json_1.X2JS();
            var json = x2js.xml_str2json(xml);
            var bullEye = _this.exctractBullEye(json);
            var imageName = filename.replace('_16.xml', '').replace('_17.xml', '') + '.png';
            var image = './app/StressEchoComponent/images/' + imageName;
            bullEye.setImageBackground(image);
            var key = filename.slice(0, filename.indexOf('.xml'));
            _this.keyedCollection.Add(key, bullEye);
            _this.SelectedBullEye = bullEye;
        });
    };
    StressEchoComponent.prototype.preLoadSummary = function (filename) {
        var _this = this;
        this.dataService.load(filename)
            .then(function (xml) {
            var x2js = new x2json_1.X2JS();
            var json = x2js.xml_str2json(xml);
            var summary = _this.exctractSummary(json);
            var imageName = filename.replace('_16.xml', '').replace('_17.xml', '');
            imageName = imageName + (filename.indexOf('6') != -1 ? '_6.png' : '.png');
            var image = './app/StressEchoComponent/images/' + imageName;
            //summary.setImageBackground(image);
            var key = filename.slice(0, filename.indexOf('.xml'));
            _this.keyedCollection.Add(key, summary);
            _this.SelectedBullEye = summary;
        });
    };
    StressEchoComponent.prototype.exctractBullEye = function (json) {
        var bullEye = new bull_eye_1.BullEye();
        json.ViewDescriptor.SegmentCollection.SegmentItem.forEach(function (jsonSegment) {
            var points = new Array();
            jsonSegment.Points.Point.forEach(function (jsonPoint) {
                points.push(new point_1.Point(Number(jsonPoint.X), Number(jsonPoint.Y)));
            });
            var polygon = new segment_part_1.Polygon(points);
            var segment = new segment_1.Segment();
            segment.parts.push(polygon);
            bullEye.segments.push(segment);
        });
        return bullEye;
    };
    StressEchoComponent.prototype.exctractSummary = function (json) {
        var summary = new summary_1.Summary();
        json.ViewDescriptor.SegmentCollection.SegmentItem.forEach(function (jsonSegment) {
            var summarySegment = new summary_segment_1.SummarySegment();
            summarySegment.startPoint = new point_1.Point(Number(jsonSegment.StartPoint.Point.X), Number(jsonSegment.StartPoint.Point.Y));
            summarySegment.internalPoint = new point_1.Point(Number(jsonSegment.InternalPoints.X), Number(jsonSegment.InternalPoints.Y));
            jsonSegment.Points.forEach(function (jsonPoint) {
                if (jsonPoint._type == 'line') {
                    var line = new segment_part_1.Line();
                    line.startPoint = new point_1.Point(Number(jsonPoint.Point[0].X), Number(jsonPoint.Point[0].Y));
                    line.endPoint = new point_1.Point(Number(jsonPoint.Point[1].X), Number(jsonPoint.Point[1].Y));
                    summarySegment.parts.push(line);
                }
                if (jsonPoint._type == 'arc') {
                    var arc = new segment_part_1.Arc();
                    arc.centerPoint = new point_1.Point(Number(jsonPoint.Center.Point.X), Number(jsonPoint.Center.Point.Y));
                    arc.startPoint = new point_1.Point(Number(jsonPoint.Start.Point.X), Number(jsonPoint.Start.Point.Y));
                    arc.angle = Number(jsonPoint.Angle);
                    arc.direction = jsonPoint.Direction;
                    summarySegment.parts.push(arc);
                }
            });
            summary.segments.push(summarySegment);
        });
        return summary;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StressEchoComponent.prototype, "segmentScoreChanged", void 0);
    StressEchoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stress-echo',
            templateUrl: 'stress-echo.component.html',
            styleUrls: ['stress-echo.component.css'],
            inputs: ['SelectedBullEye', 'BullEyeType']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], StressEchoComponent);
    return StressEchoComponent;
}());
exports.StressEchoComponent = StressEchoComponent;
//# sourceMappingURL=stress-echo.component.js.map