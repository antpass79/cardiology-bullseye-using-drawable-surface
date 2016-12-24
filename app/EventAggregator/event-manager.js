"use strict";
var message_1 = require('./message');
var EventManager = (function () {
    function EventManager() {
        this._messages = {};
        if (EventManager._instance) {
            throw new Error("Error: Instantiation failed: Use EventManager.getInstance() instead of new.");
        }
        EventManager._instance = this;
    }
    EventManager.getInstance = function () {
        return EventManager._instance;
    };
    EventManager.prototype.subscribe = function (message, callback) {
        var msg;
        msg = this._messages[message] ||
            (this._messages[message] = new message_1.Message(message));
        return msg.subscribe(callback);
    };
    EventManager.prototype.unSubscribe = function (message, token) {
        if (this._messages[message]) {
            (this._messages[message]).unsubscribe(token);
        }
    };
    EventManager.prototype.publish = function (message, payload) {
        if (this._messages[message]) {
            (this._messages[message]).notify(payload);
        }
    };
    EventManager._instance = new EventManager();
    return EventManager;
}());
exports.EventManager = EventManager;
//# sourceMappingURL=event-manager.js.map