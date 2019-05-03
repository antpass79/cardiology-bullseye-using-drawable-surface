export interface IMessage {

    subscribe(callback: (payload?: any) => void) : number;
    unsubscribe(id: number) : void;
    notify(payload?: any): void;
}