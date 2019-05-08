import { Component, Input } from '@angular/core';

@Component ({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})

export class EventListComponent {

  @Input()
  events = new Array<string>();
}