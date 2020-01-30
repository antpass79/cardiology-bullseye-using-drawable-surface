import { ISurface } from "../shapes/shape";
import { RendererCache } from "./renderer-cache";
import { DrawableSurfaceState } from "../redux/states/drawable-surface";

export interface IRendererContext {
    state: DrawableSurfaceState;
    surface: ISurface;
    rendererCache: RendererCache;
}