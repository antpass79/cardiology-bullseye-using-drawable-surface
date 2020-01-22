import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { DrawableMapDataService, BullEyeType } from './services/drawable-map-data.service';
import { Picture } from '@antpass79/drawable-surface';
import { ScoreColorPairMapService, ScoreColorPair, ScoreColorSegment } from './services/score-color-pair-map.service';
import { DrawableSurfaceComponent } from 'projects/drawable-surface/src/drawable-surface/drawable-surface.component';
import { ResizeMode } from 'projects/drawable-surface/src/drawable-surface/resize-mode';

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

  shapeMouseWheelStream$ = new Subject<any>();

  bullEyeTypes = BullEyeType;
  selectedBullEye: Picture;

  resizeModes = ResizeMode;
  selectedResizeMode = ResizeMode.none;

  events = [];

  @ViewChild(DrawableSurfaceComponent, { static: true })
  drawableSurface: DrawableSurfaceComponent;

  constructor(
    private drawableMapDataService: DrawableMapDataService,
    private scoreColorPairMapService: ScoreColorPairMapService) {
  }

  ngOnInit() {
    this.selectSurfaceStream$.subscribe((bullEyeType: BullEyeType) => {
      this.selectedBullEye = this.drawableMapDataService.bullEyes.get(bullEyeType.toString());
    });
    this.selectResizeModeStream$.subscribe((resizeMode: ResizeMode) => {
      this.selectedResizeMode = ResizeMode[resizeMode.toString()];
    });

    this.selectScoreColorPairStream$.subscribe((scoreColorPair: ScoreColorPair) => {
      let selectedShapes = this.selectedBullEye.shapes.filter((shape: ScoreColorSegment) => shape.status.selected);
      selectedShapes.forEach((shape: ScoreColorSegment) => {
        shape.scoreColorPair = scoreColorPair;
        shape.draw(this.drawableSurface);
      });
    });

    this.shapeMouseWheelStream$.subscribe(payload => {
      let currentIndex = this.scoreColorPairMapService.scoreColorPairs.findIndex(scoreColorPair => scoreColorPair === payload.shape.scoreColorPair);

      if (payload.mouseEvent.deltaY < 0 && currentIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        currentIndex++;
      if (payload.mouseEvent.deltaY > 0 && currentIndex > 0)
        currentIndex--;

      payload.shape.scoreColorPair = this.scoreColorPairMapService.scoreColorPairs[currentIndex];
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[currentIndex].description);
    });

    this.clearStream$.subscribe(() => this.events = []);
  }
}
