import { Component, AfterContentInit, OnChanges, EventEmitter, Output, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

import { Picture } from '../shapes/picture';
import { ISurface } from '../shapes/shape';
import { ResizeMode } from './resize-mode';
import { PictureRenderer } from '../shape-renderer/picture-renderer';
import { IRendererContext } from '../shape-renderer/renderer-context';
import { IMouseHandler, MouseHandler } from '../shape-handler/mouse-handler';
import { ShapeEvent } from '../shape-handler/shape-events';
import { DrawableSurfaceState } from '../redux/states/drawable-surface';
import { IMouseHandlerContext } from '../shape-handler/mouse-handler-context';
import { WorkflowService } from '../services/workflow.service';
import { RendererCache } from '../shape-renderer/renderer-cache';

@Component({
	selector: 'drawable-surface',
	templateUrl: 'drawable-surface.component.html',
	styleUrls: ['drawable-surface.component.css']
})
export class DrawableSurfaceComponent implements ISurface, AfterContentInit, OnChanges {
	@Output()
	shapeMouseMove = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseClick = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseDoubleClick = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseDown = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseUp = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseEnter = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseLeave = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseOver = new EventEmitter<ShapeEvent>();
	@Output()
	shapeMouseWheel = new EventEmitter<ShapeEvent>();

	@Input()
	picture: Picture;
	@Output()
	pictureChange = new EventEmitter<Picture>();
	@Input()
	width: number;
	@Output()
	widthChange = new EventEmitter<number>();
	@Input()
	height: number;
	@Output()
	heightChange = new EventEmitter<number>();
	@Input()
	resizeMode: ResizeMode = ResizeMode.none;
	@Output()
	resizeModeChange = new EventEmitter<ResizeMode>();

	@ViewChild("drawableCanvas", { static: true })
	canvasElement: ElementRef<HTMLCanvasElement>;
	get canvas(): HTMLCanvasElement {
		return this.canvasElement.nativeElement;
	}
	get context(): CanvasRenderingContext2D {
		return this.canvas.getContext('2d');
	}

	private pictureRenderer: PictureRenderer = new PictureRenderer();
	private mouseHandler: IMouseHandler = new MouseHandler();

	constructor(
		private workflowService: WorkflowService,
		private rendererCache: RendererCache) {
		this.workflowService.drawableSurfaceWorkflowService.listenForPicture().subscribe(picture => {			
			this.picture = picture;
			this.pictureChange.emit(this.picture);
			this.draw();
		});
		this.workflowService.drawableSurfaceWorkflowService.listenForResizeMode().subscribe(resizeMode => {
			this.resizeMode = resizeMode;
			this.resizeModeChange.emit(this.resizeMode);
			this.draw();
		});
		this.workflowService.drawableSurfaceWorkflowService.listenForWidth().subscribe(width => {
			this.width = width;
			this.widthChange.emit(this.width);
			this.draw();
		});
		this.workflowService.drawableSurfaceWorkflowService.listenForHeight().subscribe(height => {
			this.height = height;
			this.heightChange.emit(this.height);
			this.draw();
		});
	}

	ngAfterContentInit() {
		this.mouseHandler.mouseMoveChange.subscribe(shapeEvent => this.shapeMouseMove.emit(shapeEvent));
		this.mouseHandler.mouseClickChange.subscribe(shapeEvent => {
			this.workflowService.shapeWorkflowService.changeSelected(shapeEvent.shape, !shapeEvent.shape.state.selected);
			this.shapeMouseClick.emit(shapeEvent);
		});
		this.mouseHandler.mouseDoubleClickChange.subscribe(shapeEvent => this.shapeMouseDoubleClick.emit(shapeEvent));
		this.mouseHandler.mouseDownChange.subscribe(shapeEvent => this.shapeMouseDown.emit(shapeEvent));
		this.mouseHandler.mouseUpChange.subscribe(shapeEvent => this.shapeMouseUp.emit(shapeEvent));
		this.mouseHandler.mouseEnterChange.subscribe(shapeEvent => this.shapeMouseEnter.emit(shapeEvent));
		this.mouseHandler.mouseLeaveChange.subscribe(shapeEvent => this.shapeMouseLeave.emit(shapeEvent));
		this.mouseHandler.mouseOverChange.subscribe(shapeEvent => this.shapeMouseOver.emit(shapeEvent));
		this.mouseHandler.mouseWheelChange.subscribe(shapeEvent => this.shapeMouseWheel.emit(shapeEvent));
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (changes.picture) {
			this.workflowService.drawableSurfaceWorkflowService.changePicture(this, changes.picture.currentValue);
		}
		if (changes.resizeMode) {
			this.workflowService.drawableSurfaceWorkflowService.changeResizeMode(this, changes.resizeMode.currentValue);
		}
		if (changes.width) {
			this.workflowService.drawableSurfaceWorkflowService.changeSize(this, {
				width: changes.width.currentValue,
				height: this.height
			});
		}
		if (changes.height) {
			this.workflowService.drawableSurfaceWorkflowService.changeSize(this, {
				width: this.width,
				height: changes.width.currentValue
			});
		}
	}

	public async mouseMove(e: MouseEvent) {
		this.mouseHandler.mouseMove(await this.buildMouseHandlerContext(e));
	}

	public async mouseClick(e: MouseEvent) {
		this.mouseHandler.mouseClick(await this.buildMouseHandlerContext(e));
	}

	public async mouseDoubleClick(e: MouseEvent) {
		this.mouseHandler.mouseDoubleClick(await this.buildMouseHandlerContext(e));
	}

	public async mouseDown(e: MouseEvent) {
		this.mouseHandler.mouseDown(await this.buildMouseHandlerContext(e));
	}

	public async mouseUp(e: MouseEvent) {
		this.mouseHandler.mouseUp(await this.buildMouseHandlerContext(e));
	}

	public async mouseEnter(e: MouseEvent) {
		this.mouseHandler.mouseEnter(await this.buildMouseHandlerContext(e));
	}

	public async mouseLeave(e: MouseEvent) {
		this.mouseHandler.mouseLeave(await this.buildMouseHandlerContext(e));
	}

	public async mouseOver(e: MouseEvent) {
		this.mouseHandler.mouseOver(await this.buildMouseHandlerContext(e));
	}

	public async mouseWheel(e: MouseWheelEvent) {
		this.mouseHandler.mouseWheel(await this.buildMouseHandlerContext(e));
	}

	private async draw() {
		if (!this.picture || !this.picture.isBackgroundImageLoaded) {
			return;
		}

		let rendererContext: IRendererContext = {
			surface: this,
			rendererCache: this.rendererCache,
			state: await this.workflowService.drawableSurfaceWorkflowService.getStateAsync()
		};
		this.pictureRenderer.draw(rendererContext, this.picture);
	}

	private async buildMouseHandlerContext(e: MouseEvent): Promise<IMouseHandlerContext> {
		return {
			mouseEvent: e,
			rendererContext: {
				surface: this,
				state: await this.workflowService.drawableSurfaceWorkflowService.getStateAsync(),
				rendererCache: this.rendererCache
			}
		}
	}
}