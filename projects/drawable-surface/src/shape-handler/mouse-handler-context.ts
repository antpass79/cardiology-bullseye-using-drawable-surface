import { IRendererContext } from "../shape-renderer/renderer-context";

export interface IMouseHandlerContext {
    rendererContext: IRendererContext,
    mouseEvent: MouseEvent
}