import { Status } from "./status";

export class Appearance {
    lineWidth: number;
    strokeStyle: string;
    fill: string;

    update(status: Status) {
        this.lineWidth = !status.selected ? 1 : 5;
    }
    
    static default(): Appearance {
        let appearance = new Appearance();
        appearance.lineWidth = 1;
        appearance.strokeStyle = 'black';
        appearance.fill = 'transparent';

        return appearance;
    }
}