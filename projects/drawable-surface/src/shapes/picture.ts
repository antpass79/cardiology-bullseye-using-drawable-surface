import { CompositeShape } from './shape';

export class Picture extends CompositeShape {
	isBackgroundImageLoaded: boolean = false;
	readonly backgroundImage: HTMLImageElement = new Image();

	setImageBackgroundSource(imageSource: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.backgroundImage.onload = (event: any) => {
				this.isBackgroundImageLoaded = true;
				resolve();
			};
			this.backgroundImage.src = imageSource;
		});
	}
}