import { ShapeRenderer } from "./shape-renderer";
import { Picture } from "../shapes/picture";
import { CompositeShapeRenderer } from "./composite-shape-renderer";
import { IRendererContext } from "./renderer-context";

export class PictureRenderer extends ShapeRenderer<Picture> {
    private shapesRenderer: CompositeShapeRenderer = new CompositeShapeRenderer();

    draw(rendererContext: IRendererContext, shape: Picture) {
        if (!shape) {
            return;
        }
 
        this.prepareSurface(rendererContext, shape);
        this.drawSurface(rendererContext, shape);
        this.completeSurface(rendererContext);
    }

    protected prepareSurface(rendererContext: IRendererContext, picture: Picture) {
        rendererContext.surface.context.beginPath();
        rendererContext.surface.context.lineWidth = picture.state.appearance.lineWidth;
        rendererContext.surface.context.strokeStyle = picture.state.appearance.strokeStyle;
        rendererContext.surface.context.fillStyle = picture.state.appearance.fill;

        rendererContext.surface.context.clearRect(0, 0, rendererContext.surface.canvas.width, rendererContext.surface.canvas.width);
    }

    protected drawSurface(rendererContext: IRendererContext, picture: Picture) {
        if (picture.isBackgroundImageLoaded) {
			rendererContext.surface.context.drawImage(
				picture.backgroundImage,
				rendererContext.state.transform.translateX,
				rendererContext.state.transform.translateY,
				rendererContext.state.transform.scaleX * picture.backgroundImage.width,
				rendererContext.state.transform.scaleY * picture.backgroundImage.height);
		}

        this.shapesRenderer.draw(rendererContext, picture);
    }

    protected completeSurface(rendererContext: IRendererContext) {
        rendererContext.surface.context.closePath();
        rendererContext.surface.context.stroke();
        rendererContext.surface.context.fill();
    }
}