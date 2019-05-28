import { IController } from "./controllers.interface";
import express from 'express';
export default class PrayersController implements IController {
    path: string;
    router: express.Router;
    private _prayersController;
    private _prayerManager;
    private _validationController;
    constructor();
    private initializeRoutes;
    private updatePrayersByCalculation;
    private getPrayersByCalculation;
    private buildPrayerConfigObject;
    private putPrayersSettings;
    private getPrayerAdjsutments;
    private getPrayersSettings;
    private getPrayers;
    private getPrayerView;
    private getPrayerViewRow;
    private createPrayerViewRow;
    private createPrayerView;
    private refreshPrayerManager;
    private initializePrayerManger;
    static getPrayerController(): PrayersController;
}
