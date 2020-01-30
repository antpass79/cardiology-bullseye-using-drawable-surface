import { createAction, props } from '@ngrx/store';
import { AppearanceState } from '../../shapes/appearance-state';

export const AppearanceStateAction = createAction(
  '[AppearanceState] - AppearanceState',
  props<AppearanceState>()
);

export const AppearanceLineWidthAction = createAction(
  '[AppearanceState] - LineWidth',
  props<{
    payload: {
      lineWidth: number
    }
  }>()
);

export const AppearanceStrokeStyleAction = createAction(
  '[AppearanceState] - StrokeStyle',
  props<{
    payload: {
      strokeStyle: string
    }
  }>()
);

export const AppearanceFillAction = createAction(
  '[AppearanceState] - Fill',
  props<{
    payload: {
      fill: string
    }
  }>()
);
