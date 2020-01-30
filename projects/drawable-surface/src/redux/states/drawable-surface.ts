import { Picture } from "../../shapes/picture";
import { ResizeMode } from "../../drawable-surface/resize-mode";
import { Transform, TransformService } from "../../shapes/transform";

export interface DrawableSurfaceState {
    picture: Picture;
    resizeMode: ResizeMode;
    width: number;
    height: number;
    transform: Transform;
}

export const initialDrawableSurfaceState: DrawableSurfaceState = {
    picture: new Picture(),
    resizeMode: ResizeMode.none,
    width: 300,
    height: 200,
    transform: TransformService.default()
}