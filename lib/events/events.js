"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
const event_1 = require("@dpanet/prayers-lib/lib/managers/event");
const to = require('await-to-js').default;
const chokidar = require("chokidar");
class ConfigEventProvider extends event_1.EventProvider {
    constructor(pathName) {
        super();
        this._pathName = pathName;
        this._chokidar = chokidar.watch(this._pathName);
        this._chokidar.on("change", this.fileChangedEvent);
    }
    registerListener(observer) {
        super.registerListener(observer);
    }
    removeListener(observer) {
        super.removeListener(observer);
    }
    notifyObservers(eventType, fileName, error) {
        super.notifyObservers(eventType, fileName, error);
    }
    fileChangedEvent(pathName) {
        this.notifyObservers(event_1.EventsType.OnNext, pathName);
    }
}
exports.ConfigEventProvider = ConfigEventProvider;
//# sourceMappingURL=events.js.map