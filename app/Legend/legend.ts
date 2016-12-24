import { Component } from '@angular/core';

import { SegmentScore } from './../StressEchoComponent/segment-score';
import { EchoUtils } from './../StressEchoComponent/echo-utils';

@Component({

    moduleId: module.id,
    selector: 'legend',
    templateUrl: './legend.html'
})

export class Legend {

  scores = EchoUtils.getInstance().scoreColorPair.items;
  keys: string[] = EchoUtils.getInstance().scoreColorPair.Keys();

  onSelect(key: string) {
      console.log(key);
  }

  getColor(key: string) {

      return EchoUtils.getInstance().scoreColorPair.Item(key).color;
  }
}