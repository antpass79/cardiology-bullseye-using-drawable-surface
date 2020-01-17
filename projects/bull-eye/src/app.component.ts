import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DrawableMapDataService, BullEyeType } from './services/drawable-map-data.service';
import { Picture } from './components/stress-echo/shapes/picture';
import { ScoreColorPairMapService } from './components/stress-echo/services/score-color-pair-map.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectStream$ = new Subject<BullEyeType>();
  clearStream$ = new Subject<any>();

  segmentMouseWheelStream$ = new Subject<any>();
  segmentMouseClickStream$ = new Subject<any>();

  bullEyeTypes = BullEyeType;
  events = [];
  selectedBullEye: Picture;

  constructor(
    private drawableMapDataService: DrawableMapDataService,
    private scoreColorPairMapService: ScoreColorPairMapService) {
  }

  ngOnInit() {
    this.selectStream$.subscribe((bullEyeType: BullEyeType) => {
      this.selectedBullEye = this.drawableMapDataService.bullEyes.get(bullEyeType.toString());
    });
    this.clearStream$.subscribe(() => this.events = []);

    this.segmentMouseWheelStream$.subscribe(payload => {
      let currentIndex = this.scoreColorPairMapService.scoreColorPairs.findIndex(scoreColorPair => scoreColorPair === payload.segment.scoreColorPair);

      if (payload.mouseEvent.deltaY < 0 && currentIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        currentIndex++;
      if (payload.mouseEvent.deltaY > 0 && currentIndex > 0)
        currentIndex--;

      payload.segment.scoreColorPair = this.scoreColorPairMapService.scoreColorPairs[currentIndex];
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[currentIndex].description);
    });

    this.segmentMouseClickStream$.subscribe(payload => {
      let currentIndex = this.scoreColorPairMapService.scoreColorPairs.findIndex(scoreColorPair => scoreColorPair === payload.segment.scoreColorPair);

      if (currentIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        currentIndex++;
      else
        currentIndex = 0;

      payload.segment.scoreColorPair = this.scoreColorPairMapService.scoreColorPairs[currentIndex];
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[currentIndex].description);
    });
  }
}
