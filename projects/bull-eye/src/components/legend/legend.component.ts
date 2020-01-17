import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ScoreColorPairMapService, ScoreColorPair } from '../../services/score-color-pair-map.service';

@Component({
    selector: 'legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {
    selectStream$ = new Subject<ScoreColorPair>();

    @Output()
    select = new EventEmitter<ScoreColorPair>();
  
    scoreColorPairs = [];

    constructor(private scoreColorPairService: ScoreColorPairMapService) {
    }

    ngOnInit() {
        this.selectStream$.subscribe((scoreColorPair: ScoreColorPair) => this.select.emit(scoreColorPair));
        this.scoreColorPairs = this.scoreColorPairService.scoreColorPairs;
    }
}