import * as prayerlib from "@dpanet/prayers-lib";
import IController from "./controllers.interface";
import express from 'express';
export interface IPrayersView {
    prayerDate: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    sunset: string;
    maghrib: string;
    isha: string;
    midnight: string;
}
export interface IPrayersViewRow {
    prayerDate: string;
    prayerTime: string;
    prayerName: prayerlib.PrayersName;
}
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
    private getPrayerView;
    private getPrayerViewRow;
    private createPrayerViewRow;
    private createPrayerView;
    private initializePrayerManger;
    static getPrayerController(): PrayersController;
}
