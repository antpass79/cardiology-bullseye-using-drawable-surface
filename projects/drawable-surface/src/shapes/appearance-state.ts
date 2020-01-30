export interface AppearanceState {
    readonly lineWidth: number;
    readonly strokeStyle: string;
    fill: string;
}

export const initialAppearanceState: AppearanceState = {
    lineWidth: 1,
    strokeStyle: 'black',
    fill: 'transparent'
}