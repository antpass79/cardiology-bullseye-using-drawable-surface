import { Injectable } from "@angular/core";
import { DrawableSurfaceWorkflowService } from "./drawable-surface-workflow.service";
import { ShapeWorkflowService } from "./shape-workflow.service";

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {
    constructor(
        public readonly drawableSurfaceWorkflowService: DrawableSurfaceWorkflowService,
        public readonly shapeWorkflowService: ShapeWorkflowService) {
    }
}