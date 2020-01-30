import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { take } from "rxjs/operators";
import { DrawableSurfaceState } from "../redux/states/drawable-surface";
import * as DrawableSurfaceActions from '../redux/actions/drawable-surface';
import { Picture } from "../shapes/picture";
import { ISurface } from "../shapes/shape";
import { ResizeMode } from "../drawable-surface/resize-mode";
import { Size } from "../shapes/size";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DrawableSurfaceWorkflowService {
    private readonly DRAWABLE_SURFACE = 'drawableSurface';

    constructor(private store: Store<{ drawableSurface: DrawableSurfaceState }>) {
    }

    public async getStateAsync() {
        let state = await this.store
            .pipe(select(this.DRAWABLE_SURFACE))
            .pipe(take(1))
            .toPromise();

        return state;
    }

    public listenForEveryChanges(): Observable<{ drawableSurface: DrawableSurfaceState }> {
        return this.store;
    }

    public changePicture(surface: ISurface, picture: Picture) {
        this.store.dispatch(DrawableSurfaceActions.DrawableSurfacePictureAction({
            payload: {
                surface: surface,
                picture: picture
            }
        }));
    }

    public changeResizeMode(surface: ISurface, resizeMode: ResizeMode) {
        this.store.dispatch(DrawableSurfaceActions.DrawableSurfaceResizeModeAction({
            payload: {
                surface: surface,
                resizeMode: resizeMode
            }
        }));
    }

    public changeSize(surface: ISurface, size: Size) {
        this.store.dispatch(DrawableSurfaceActions.DrawableSurfaceSizeAction({
            payload: {
                surface: surface,
                size: size
            }
        }));
    }
}