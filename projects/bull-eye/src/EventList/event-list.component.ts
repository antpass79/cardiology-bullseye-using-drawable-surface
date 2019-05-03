import { Component } from '@angular/core';

@Component ({

    moduleId: module.id,
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css'],
    inputs: ['events']
})

export class EventListComponent {

  events = new Array<string>();
}