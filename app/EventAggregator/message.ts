import { IMessage } from './imessage';
import { Subscription } from './subscription';

export class Message implements IMessage {

    private _subscriptions: Subscription[];
    private _nextId: number;

    constructor (public message: string) {

        this._subscriptions = [];
        this._nextId = 0;
    }

public subscribe(callback: (payload?: any) => void) {

    var subscription = new Subscription(this._nextId++, callback);
    this._subscriptions[subscription.id] = subscription;

    return subscription.id;
}

public unsubscribe(id: number) {
    
    this._subscriptions[id] = undefined;                        
}

public notify(payload?: any) {

    for (var index: number = 0; index < this._subscriptions.length; index++) {
    
        if (this._subscriptions[index]) {
            this._subscriptions[index].callback(payload);
            }
        }
    }
}