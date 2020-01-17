import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
  clearStream$ = new Subject<any>();

  @Output()
  clear = new EventEmitter();

  @Input()
  events = [];

  ngOnInit() {
    this.clearStream$.subscribe(() => this.clear.emit());
  }
}