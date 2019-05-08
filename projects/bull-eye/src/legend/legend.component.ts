import { Component } from '@angular/core';
import { EchoUtils } from './../stress-echo/utils/echo-utils';

@Component({
    selector: 'legend',
    templateUrl: './legend.component.html'
})
export class LegendComponent {

  scores = EchoUtils.getInstance().scoreColorPair.items;
  keys: string[] = EchoUtils.getInstance().scoreColorPair.Keys();

  onSelect(key: string) {
      console.log(key);
  }

  getColor(key: string) {
      return EchoUtils.getInstance().scoreColorPair.Item(key).color;
  }
}