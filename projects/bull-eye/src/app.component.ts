import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { Picture } from '@antpass79/drawable-surface';
import { DrawableSurfaceComponent } from '@antpass79/drawable-surface';
import { ResizeMode } from '@antpass79/drawable-surface';
import { ShapeWheelEvent } from '@antpass79/drawable-surface';

import { DrawableMapDataService, BullEyeType } from './services/drawable-map-data.service';
import { ScoreColorPairMapService, ScoreColorPair } from './services/score-color-pair-map.service';
import { ScoreColorSegment } from './shapes/color-score-segment';
import { ShapeWorkflowService } from 'projects/drawable-surface/src';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectSurfaceStream$ = new Subject<BullEyeType>();
  selectResizeModeStream$ = new Subject<ResizeMode>();
  selectScoreColorPairStream$ = new Subject<ScoreColorPair>();
  clearStream$ = new Subject<any>();

  shapeMouseWheelStream$ = new Subject<ShapeWheelEvent>();

  bullEyeTypes = BullEyeType;
  selectedBullEye: Picture;

  resizeModes = ResizeMode;
  selectedResizeMode = ResizeMode.none;

  events = [];

  @ViewChild(DrawableSurfaceComponent, { static: true })
  drawableSurface: DrawableSurfaceComponent;

  constructor(
    private drawableMapDataService: DrawableMapDataService,
    private scoreColorPairMapService: ScoreColorPairMapService,
    private shapeWorkflowService: ShapeWorkflowService) {
  }

  ngOnInit() {
    this.selectSurfaceStream$.subscribe((bullEyeType: BullEyeType) => {
      this.selectedBullEye = this.drawableMapDataService.bullEyes.get(bullEyeType.toString());
    });
    this.selectResizeModeStream$.subscribe((resizeMode: ResizeMode) => {
      this.selectedResizeMode = ResizeMode[resizeMode.toString()];
    });

    this.selectScoreColorPairStream$.subscribe((scoreColorPair: ScoreColorPair) => {
      let selectedShapes = this.selectedBullEye.shapes.filter((shape: ScoreColorSegment) => shape.state.selected);
      selectedShapes.forEach((shape: ScoreColorSegment) => {
        this.shapeWorkflowService.changeProps(shape, scoreColorPair);
      });
    });

    this.shapeMouseWheelStream$.subscribe(payload => {
      let segment = payload.shape as ScoreColorSegment;

      let currentIndex = this.scoreColorPairMapService.scoreColorPairs.findIndex(scoreColorPair => scoreColorPair.color === segment.props.color);

      if (payload.mouseEvent.deltaY < 0 && currentIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        currentIndex++;
      if (payload.mouseEvent.deltaY > 0 && currentIndex > 0)
        currentIndex--;

      this.shapeWorkflowService.changeProps(segment, this.scoreColorPairMapService.scoreColorPairs[currentIndex]);
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[currentIndex].description);
    });

    this.clearStream$.subscribe(() => this.events = []);
  }
}
