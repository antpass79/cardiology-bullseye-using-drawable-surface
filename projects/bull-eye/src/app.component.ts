import { Component } from '@angular/core';
import { BullEyeType }  from './stress-echo/utils/bull-eye-type';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  bullEyeTypes = BullEyeType;
  keys: string[] = Object.keys(this.bullEyeTypes).filter(Number);
  
  events = new Array<string>();
  selectedBullEyeType: BullEyeType;

  onSelect(key: string) {

    this.selectedBullEyeType = BullEyeType[key];
  }

  onClear() {

    this.events = new Array<string>();
  }

  onSegmentScoreChanged(payload?: any): void {

    this.events.push(payload.scoreColorPair.description);
  }
}
