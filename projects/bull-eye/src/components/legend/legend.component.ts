import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EchoUtils } from '../stress-echo/utils/echo-utils';
import { ScoreColorPair } from '../stress-echo/utils/score-color-pair';
import { Subject } from 'rxjs';

@Component({
    selector: 'legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {
    selectStream$ = new Subject<ScoreColorPair>();

    @Output()
    select = new EventEmitter<ScoreColorPair>();
  
    scores = [];

    ngOnInit() {
        this.selectStream$.subscribe((scoreColorPair: ScoreColorPair) => this.select.emit(scoreColorPair));
        this.scores = Array.from(EchoUtils.getInstance().scoreColorPair.values());
    }
}