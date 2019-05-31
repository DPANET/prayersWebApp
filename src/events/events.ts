const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
import {EventProvider,EventsType,IObserver,IObservable}from '@dpanet/prayers-lib/lib/managers/event';
const to = require('await-to-js').default;
import chokidar = require('chokidar');
import { isNullOrUndefined } from 'util';
import { IPrayersConfig } from '@dpanet/prayers-lib/lib/configurators/inteface.configuration';
export class ConfigEventProvider extends EventProvider<string>
{
    private _pathName: string;
    private _chokidar: chokidar.FSWatcher;
    constructor(pathName: string) {
        super();
        this._pathName= pathName;
        this._chokidar = chokidar.watch(this._pathName);
        this._chokidar.on("change",this.fileChangedEvent);
    }
    public registerListener(observer: IObserver<string>): void {
        super.registerListener(observer);
    }
    public removeListener(observer: IObserver<string>): void {
        super.removeListener(observer);
    }
    public notifyObservers(eventType: EventsType, fileName: string, error?: Error): void {
        super.notifyObservers(eventType, fileName, error);
    }
    private fileChangedEvent(pathName:string)
    {
        this.notifyObservers(EventsType.OnNext,pathName);

    }
}