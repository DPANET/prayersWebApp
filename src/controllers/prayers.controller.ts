import * as prayerlib from "@dpanet/prayers-lib";
import IController from "./controllers.interface";
import express from 'express';
import { timingSafeEqual } from "crypto";

export default class PrayersController implements IController
{

    path: string;
    router: express.Router;
    private _prayersController:PrayersController;
    private _prayerManager: prayerlib.IPrayerManager;
    constructor()
    {
        this.path = "/PrayerManager";
        this.router= express.Router();
        this.initializeRoutes();
        this.initializePrayerManger();
    }
    private initializeRoutes() {
        this.router.get(this.path+"/PrayersAdjustments", this.getPrayerAdjsutments);
        this.router.get(this.path+"/PrayersSettings",this.getPrayersSettings);
        this.router.get(this.path+ "/Prayers",this.getPrayers);
      }
    private getPrayerAdjsutments=  (request: express.Request, response: express.Response)=>
    {
        let prayerAdjustments: prayerlib.IPrayerAdjustments[]= this._prayerManager.getPrayerAdjsutments();
         response.json( prayerAdjustments);
    }

    private getPrayersSettings = (request: express.Request, response: express.Response)=>
    {
        let prayersSettings: prayerlib.IPrayersSettings= (this._prayerManager.getPrayerSettings()as prayerlib.PrayersSettings).toJSON();
         response.json( prayersSettings);
    }
    private getPrayers = (request: express.Request, response: express.Response)=>
    {
        let prayers: prayerlib.IPrayers[] = (this._prayerManager.getPrayers() as prayerlib.Prayers[]);
        response.json(prayers);
    }
    private async initializePrayerManger():Promise<void>
    {   
        let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        this._prayerManager= await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        console.log(this._prayerManager.getPrayerAdjsutments());
    }
    static getPrayerController(): PrayersController
    {

        return ;

    }
}
