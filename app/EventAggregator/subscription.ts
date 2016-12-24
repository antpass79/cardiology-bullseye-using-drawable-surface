export class Subscription {

    constructor (public id: number, public callback: (payload?: any) => void) { }
}