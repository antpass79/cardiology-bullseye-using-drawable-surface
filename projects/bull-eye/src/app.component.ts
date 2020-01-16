import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BullEyeDataService, BullEyeType } from './services/bull-eye-data.service';
import { BullEye } from './components/stress-echo/shapes/bull-eye';
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
  selectedBullEye: BullEye;

  private selectedScoreIndex = 0;

  constructor(
    private bullEyeDataService: BullEyeDataService,
    private scoreColorPairMapService: ScoreColorPairMapService) {
  }

  ngOnInit() {
    this.selectStream$.subscribe((bullEyeType: BullEyeType) => {
      this.selectedBullEye = this.bullEyeDataService.bullEyes.get(bullEyeType.toString());
    });
    this.clearStream$.subscribe(() => this.events = []);

    this.segmentMouseWheelStream$.subscribe(payload => {
      if (payload.mouseEvent.deltaY < 0 && this.selectedScoreIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        this.selectedScoreIndex++;
      if (payload.mouseEvent.deltaY > 0 && this.selectedScoreIndex > 0)
        this.selectedScoreIndex--;

      payload.segment.fill = this.scoreColorPairMapService.scoreColorPairs[this.selectedScoreIndex].color;
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[this.selectedScoreIndex].description);
    });

    this.segmentMouseClickStream$.subscribe(payload => {
      if (this.selectedScoreIndex < this.scoreColorPairMapService.scoreColorPairs.length - 1)
        this.selectedScoreIndex++;
      else
        this.selectedScoreIndex = 0;

      payload.segment.fill = this.scoreColorPairMapService.scoreColorPairs[this.selectedScoreIndex].color;
      this.events.push(this.scoreColorPairMapService.scoreColorPairs[this.selectedScoreIndex].description);
    });
  }
}
