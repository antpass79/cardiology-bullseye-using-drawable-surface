import { AppearanceState, initialAppearanceState } from './appearance-state';

export interface ShapeState {
    selected: boolean;
    appearance: AppearanceState;
}

export const initialShapeState: ShapeState = {
    selected: false,
    appearance: initialAppearanceState
}