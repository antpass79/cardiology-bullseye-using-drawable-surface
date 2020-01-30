import { createReducer, on, Action } from "@ngrx/store";

import { initialDrawableSurfaceState, DrawableSurfaceState } from "../states/drawable-surface";
import * as DrawableSurfaceActions from '../actions/drawable-surface';
import { PictureTransformFactory } from "../../services/picture-trasform-factory";
import { Picture } from "../../shapes/picture";
import { ResizeMode } from "../../drawable-surface/resize-mode";
import { Transform } from "../../shapes/transform";
import { IShape } from "../../shapes/shape";

const reducer = createReducer(
  initialDrawableSurfaceState,
  on(DrawableSurfaceActions.DrawableSurfaceStateAction, state => state),
  on(DrawableSurfaceActions.DrawableSurfacePictureAction, (state: DrawableSurfaceState, { payload }) => {
    return { ...state, picture: payload.picture, transform: createTransform(payload.picture, payload.surface.canvas, state.resizeMode) }
  }),
  on(DrawableSurfaceActions.DrawableSurfaceResizeModeAction, (state: DrawableSurfaceState, { payload }) => {
    return { ...state, resizeMode: payload.resizeMode, transform: createTransform(state.picture, payload.surface.canvas, payload.resizeMode) }
  }),
  on(DrawableSurfaceActions.DrawableSurfaceSizeAction, (state: DrawableSurfaceState, { payload }) => {
    return { ...state, width: payload.size.width, height: payload.size.height, transform: createTransform(state.picture, payload.surface.canvas, state.resizeMode) }
  }),

  on(DrawableSurfaceActions.ShapeStateSelectedAction, (state: DrawableSurfaceState, { payload }) => {
    let updatedShape: IShape = {
      ...payload.shape,
      state: {
        ...payload.shape.state,
        selected: payload.selected,
        appearance: {
          ...payload.shape.state.appearance,
          lineWidth: !payload.selected ? 1 : 5
        }
      }
    };
    return {
      ...state,
      picture: {
        ...state.picture,
        shapes: state.picture.shapes.map(shape => shape === payload.shape ? updatedShape : shape)
      }
    }
  }),
  on(DrawableSurfaceActions.ShapeStatePropsAction, (state: DrawableSurfaceState, { payload }) => {
    let updatedShape: IShape = {
      ...payload.shape,
      props: payload.props
    };
    return {
      ...state,
      picture: {
        ...state.picture,
        shapes: state.picture.shapes.map(shape => shape === payload.shape ? updatedShape : shape)
      }
    }
  }),
);

export function drawableSurfaceReducer(state: DrawableSurfaceState | undefined, action: Action) {
  return reducer(state, action);
}

function createTransform(picture: Picture, canvas: HTMLCanvasElement, resizeMode: ResizeMode): Transform {
  return PictureTransformFactory.create(picture, picture && picture.backgroundImage ? picture.backgroundImage : undefined, canvas, resizeMode);
}