import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Store, select } from "@ngrx/store";

import * as DrawableSurfaceActions from '../redux/actions/drawable-surface';
import { ShapeState } from "../shapes/shape-state";
import { IShape } from "../shapes/shape";

@Injectable({
    providedIn: 'root'
})
export class ShapeWorkflowService {
    private readonly SHAPE = 'shape';

    constructor(private store: Store<{ shape: ShapeState }>) {
    }

    public async getStateAsync() {
        let state = await this.store
            .pipe(select(this.SHAPE))
            .pipe(take(1))
            .toPromise();

        return state;
    }

    public listenForEveryChanges(): Observable<{ shape: ShapeState }> {
        return this.store;
    }

    public changeSelected(shape: IShape, selected: boolean) {
        this.store.dispatch(DrawableSurfaceActions.ShapeStateSelectedAction({
            payload: {
                shape: shape,
                selected: selected
            }
        }));
    }

    public changeProps(shape: IShape, props: any) {
        this.store.dispatch(DrawableSurfaceActions.ShapeStatePropsAction({
            payload: {
                shape: shape,
                props: props
            }
        }));
    }
}