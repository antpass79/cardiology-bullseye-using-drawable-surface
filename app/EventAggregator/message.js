"use strict";
var subscription_1 = require('./subscription');
var Message = (function () {
    function Message(message) {
        this.message = message;
        this._subscriptions = [];
        this._nextId = 0;
    }
    Message.prototype.subscribe = function (callback) {
        var subscription = new subscription_1.Subscription(this._nextId++, callback);
        this._subscriptions[subscription.id] = subscription;
        return subscription.id;
    };
    Message.prototype.unsubscribe = function (id) {
        this._subscriptions[id] = undefined;
    };
    Message.prototype.notify = function (payload) {
        for (var index = 0; index < this._subscriptions.length; index++) {
            if (this._subscriptions[index]) {
                this._subscriptions[index].callback(payload);
            }
        }
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map