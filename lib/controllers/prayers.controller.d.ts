import IController from "./controllers.interface";
import express from 'express';
export default class PrayersController implements IController {
    path: string;
    router: express.Router;
    private _prayersController;
    private _prayerManager;
    constructor();
    private initializeRoutes;
    private getPrayerAdjsutments;
    private getPrayersSettings;
    private getPrayers;
    private initializePrayerManger;
    static getPrayerController(): PrayersController;
}
