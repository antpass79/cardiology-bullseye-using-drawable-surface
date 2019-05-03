import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { DataService }  from './StressEchoComponent/data.service';

import { AppComponent }  from './app.component';
import { StressEchoComponent }  from './StressEchoComponent/stress-echo.component';
import { EventListComponent }  from './EventList/event-list.component';
import { Legend }  from './Legend/legend';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, StressEchoComponent, EventListComponent, Legend ],
  providers: 	  [DataService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
