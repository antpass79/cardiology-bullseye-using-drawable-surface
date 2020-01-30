import { createAction, props } from '@ngrx/store';
import { Picture } from '../../shapes/picture';
import { ResizeMode } from '../../drawable-surface/resize-mode';
import { Size } from '../../shapes/size';
import { DrawableSurfaceState } from '../states/drawable-surface';
import { ISurface, IShape } from '../../shapes/shape';

export const DrawableSurfaceStateAction = createAction(
  '[DrawableSurface] - DrawableSurfaceState',
  props<DrawableSurfaceState>()
);

export const DrawableSurfacePictureAction = createAction(
  '[DrawableSurface] - Picture',
  props<{
    payload: {
      surface: ISurface,
      picture: Picture
    }
  }>()
);

export const DrawableSurfaceResizeModeAction = createAction(
  '[DrawableSurface] - ResizeMode',
  props<{
    payload: {
      surface: ISurface,
      resizeMode: ResizeMode
    }
  }>()
);

export const DrawableSurfaceSizeAction = createAction(
  '[DrawableSurface] - Size',
  props<{
    payload: {
      surface: ISurface,
      size: Size
    }
  }>()
);

export const ShapeStateSelectedAction = createAction(
  '[ShapeState] - Selected',
  props<{
    payload: {
      shape: IShape,
      selected: boolean
    }
  }>()
);

export const ShapeStatePropsAction = createAction(
  '[ShapeState] - Props',
  props<{
    payload: {
      shape: IShape,
      props: any
    }
  }>()
);