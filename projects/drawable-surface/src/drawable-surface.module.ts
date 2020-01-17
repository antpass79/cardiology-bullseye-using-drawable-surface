import { NgModule } from '@angular/core';
import { DrawableSurfaceComponent } from './drawable-surface/drawable-surface.component';

@NgModule({
  declarations: [
    DrawableSurfaceComponent
  ],
  exports: [DrawableSurfaceComponent]
})
export class DrawableSurfaceModule { }