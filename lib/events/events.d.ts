import { EventProvider, EventsType, IObserver } from '@dpanet/prayers-lib/lib/managers/event';
export declare class ConfigEventProvider extends EventProvider<string> {
    private _pathName;
    private _chokidar;
    constructor(pathName: string);
    registerListener(observer: IObserver<string>): void;
    removeListener(observer: IObserver<string>): void;
    notifyObservers(eventType: EventsType, fileName: string, error?: Error): void;
    private fileChangedEvent;
    private fileChangeError;
}
export declare class ConfigEventListener implements IObserver<string> {
    constructor();
    onCompleted(): void;
    onError(error: Error): void;
    onNext(value: string): void;
}
