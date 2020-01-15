export class Point {
	private _x: number;
	get x(): number {
		return this._x;
	}

	private _y: number;
	get y(): number {
		return this._y;
	}

	constructor (x: number, y: number) {
		this._x = x;
		this._y = y;
	}
}