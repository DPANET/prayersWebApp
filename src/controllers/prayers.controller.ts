import * as prayerlib from "@dpanet/prayers-lib";
import IController from "./controllers.interface";
import express from 'express';

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
