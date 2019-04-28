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
        // this.router.get(`${this.path}/:id`, this.getPostById);
        // this.router.put(`${this.path}/:id`, this.modifyPost);
        // this.router.delete(`${this.path}/:id`, this.deletePost);
        // this.router.post(this.path, this.createPost);
      }
    private getPrayerAdjsutments=  (request: express.Request, response: express.Response)=>
    {
        let prayerAdjustments: prayerlib.IPrayerAdjustments[]= this._prayerManager.getPrayerAdjsutments();
         response.json( prayerAdjustments);
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
