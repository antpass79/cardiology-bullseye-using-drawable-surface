import { IMessage } from './imessage';
import { Message } from './message';
import { Subscription } from './subscription';

export class EventManager {
 
    private static _instance: EventManager = new EventManager();
    public static getInstance(): EventManager {
        return EventManager._instance;
    }

    private _messages: any;
 
    constructor () {

        this._messages = {};

        if (EventManager._instance){
            throw new Error("Error: Instantiation failed: Use EventManager.getInstance() instead of new.");
        }

        EventManager._instance = this;
    }
 
    subscribe(message: string, callback: (payload?: any) => void ) {
        
        var msg: IMessage;            
        msg = this._messages[message] ||
            <IMessage>(this._messages[message] = new Message(message));
                       
        return msg.subscribe(callback);                        
    }
        
    unSubscribe(message: string, token: number) {            
        
        if (this._messages[message]) {
    
            (<IMessage>(this._messages[message])).unsubscribe(token);
        }
    }
 
    publish(message: string, payload?: any) {
        if (this._messages[message]) {
            (<IMessage>(this._messages[message])).notify(payload);
        }
    }
}