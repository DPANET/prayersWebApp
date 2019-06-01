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
        this._chokidar.options = {};
        this._chokidar.on("change", this.fileChangedEvent.bind(this));
        this._chokidar.on("error", this.fileChangeError.bind(this));
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
        try {
            this.notifyObservers(event_1.EventsType.OnNext, pathName);
        }
        catch (err) {
            this.notifyObservers(event_1.EventsType.OnError, pathName, err);
        }
    }
    fileChangeError(error) {
        this.notifyObservers(event_1.EventsType.OnError, this._pathName, error);
    }
}
exports.ConfigEventProvider = ConfigEventProvider;
class ConfigEventListener {
    //private _prayerAppManager: manager.PrayersAppManager
    constructor() {
    }
    onCompleted() {
    }
    onError(error) {
        debug(error);
    }
    onNext(value) {
        debug(`${value} config file has been saved, good job`);
    }
}
exports.ConfigEventListener = ConfigEventListener;
//# sourceMappingURL=events.js.map