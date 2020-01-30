import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { DrawableSurfaceComponent } from './drawable-surface/drawable-surface.component';
import { drawableSurfaceReducer } from './redux/reducers/drawable-surface';

@NgModule({
  declarations: [
    DrawableSurfaceComponent
  ],
  imports: [StoreModule.forRoot({ drawableSurface: drawableSurfaceReducer })],
  exports: [DrawableSurfaceComponent]
})
export class DrawableSurfaceModule { }