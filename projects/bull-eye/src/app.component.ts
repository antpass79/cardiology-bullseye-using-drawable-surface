import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BullEyeType }  from './components/stress-echo/utils/bull-eye-type';
import { DataService } from './components/stress-echo/utils/data.service';
import { BullEye } from './components/stress-echo/shapes/bull-eye';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectStream$ = new Subject<BullEyeType>();
  clearStream$ = new Subject<any>();
  segmentScoreChangedStream$ = new Subject<any>();

  bullEyeTypes = BullEyeType;
  events = [];
  selectedBullEye: BullEye;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.selectStream$.subscribe((bullEyeType: BullEyeType) => {
      this.selectedBullEye = this.dataService.bullEyes.get(bullEyeType.toString());
    });
    this.clearStream$.subscribe(() => this.events = []);
    this.segmentScoreChangedStream$.subscribe((payload) => this.events.push(payload.scoreColorPair.description));
  }
}
