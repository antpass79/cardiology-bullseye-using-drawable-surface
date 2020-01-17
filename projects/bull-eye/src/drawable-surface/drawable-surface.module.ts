import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DrawableSurfaceComponent } from './drawable-surface.component';

@NgModule({
  declarations: [
    DrawableSurfaceComponent
  ],
  exports: [DrawableSurfaceComponent]
})
export class DrawableSurfaceModule { }