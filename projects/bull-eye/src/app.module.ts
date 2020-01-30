import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { DrawableSurfaceModule } from '@antpass79/drawable-surface';
import { RendererCache } from '@antpass79/drawable-surface';

import { DrawableMapDataService } from './services/drawable-map-data.service';

import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LegendComponent } from './components/legend/legend.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { BullEyeRendererFactoryService } from './shapes/color-score-segment';

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
      provide: RendererCache,
      useClass: RendererCache,
      deps: [BullEyeRendererFactoryService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: bullEyeDataLoader,
      deps: [DrawableMapDataService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function bullEyeDataLoader(drawableMapDataService: DrawableMapDataService) {
  return (): Promise<any> => {
    console.log('Data loading...');

    return drawableMapDataService.preLoadDrawableMaps();
  };
}