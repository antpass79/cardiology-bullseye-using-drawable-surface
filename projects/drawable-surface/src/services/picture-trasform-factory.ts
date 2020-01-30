import { Transform, TransformService } from "../shapes/transform";
import { IShape } from "../shapes/shape";
import { ResizeMode } from "../drawable-surface/resize-mode";

export class PictureTransformFactory {
    static create(picture: IShape, image: HTMLImageElement, canvas: HTMLCanvasElement, resizeMode: ResizeMode) {
        let transform: Transform = TransformService.default();
        if (!picture || !image) {
            return transform;
        }            

        switch (resizeMode) {
			case ResizeMode.fitToImage: {
                transform = PictureTransformFactory.internalCreate(image.width, canvas.width, image.height, canvas.height, true);
				break;
			}
			case ResizeMode.fitToPicture: {
                transform = PictureTransformFactory.internalCreate(picture.getGhost().X2 - picture.getGhost().X1, canvas.width, picture.getGhost().Y2 - picture.getGhost().Y1, canvas.height, false);
				break;
			}
			case ResizeMode.fillToImage: {
                transform = PictureTransformFactory.internalCreate(image.width, canvas.width, image.height, canvas.height, false);
				break;
			}
			case ResizeMode.fillToPicture: {
                transform = PictureTransformFactory.internalCreate(picture.getGhost().X2 - picture.getGhost().X1, canvas.width, picture.getGhost().Y2 - picture.getGhost().Y1, canvas.height, false);
				break;
			}
			case ResizeMode.none:
			default: {
				break;
			}
        }
        
        return transform;
    }    
    
    private static internalCreate(widthToResize: number, referenceWitdh: number, heightToResize: number, referenceHeight: number, toFit: boolean): Transform {
        let transform: Transform = TransformService.default();
        let resizeFunc = toFit ? Math.min : Math.max;
        let scale = resizeFunc(referenceWitdh / widthToResize, referenceHeight / heightToResize);
        let translateX = (referenceWitdh / 2) - (widthToResize / 2) * scale;
        let translateY = (referenceHeight / 2) - (heightToResize / 2) * scale;

        transform = TransformService.create(translateX, translateY, scale, scale);
        return transform;
    }
}