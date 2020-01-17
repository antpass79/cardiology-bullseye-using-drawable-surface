import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { DrawableMapDataService } from './services/drawable-map-data.service';

import { AppComponent } from './app.component';
import { DrawableSurfaceModule } from '@antpass79/drawable-surface';
import { EventListComponent } from './components/event-list/event-list.component';
import { LegendComponent } from './components/legend/legend.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    DrawableSurfaceModule
  ],
  declarations: [
    AppComponent,    
    EventListComponent,
    LegendComponent,
    EnumToArrayPipe
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: DataLoader,
      deps: [DrawableMapDataService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function DataLoader(drawableMapDataService: DrawableMapDataService) {
  return (): Promise<any> => {
    console.log('Data loading...');

    return drawableMapDataService.preLoadDrawableMaps();
  };
}
