import { IController } from "./controllers.interface";
import express from 'express';
export default class PrayersController implements IController {
    path: string;
    router: express.Router;
    private _prayersController;
    private _prayerManager;
    private _validationController;
    private _validatePrayerManager;
    private _validateConfigParam;
    private _validateConfigBody;
    constructor();
    private initializeValidators;
    private initializeRoutes;
    private getPrayerLocation;
    private reloadConfig;
    private validatePrayerManagerRequest;
    private getPrayerManager;
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
