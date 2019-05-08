
export interface Point {
	
	x: number;
	y: number;

	getPoint(): number[];
}

export class Point implements Point {
	
	constructor (public x: number, public y: number) { }

	getPoint(): number[] {

		return [ this.x, this.y ];
	}
}