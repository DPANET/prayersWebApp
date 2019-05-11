const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
import * as prayerlib from "@dpanet/prayers-lib";
import { IController, IPrayersView, IPrayersViewRow } from "./controllers.interface";
import express from 'express';
import moment from "moment";
import { isNullOrUndefined } from "util";
import Configurator from "@dpanet/prayers-lib/lib/configurators/configuration";



export default class PrayersController implements IController {


    path: string;
    router: express.Router;
    private _prayersController: PrayersController;
    private _prayerManager: prayerlib.IPrayerManager;
    constructor() {
        this.path = "/PrayerManager";
        this.router = express.Router();
        this.initializeRoutes();
        this.initializePrayerManger();
    }
    private initializeRoutes() {
        this.router.get(this.path + "/PrayersAdjustments", this.getPrayerAdjsutments);
        this.router.get(this.path + "/PrayersSettings", this.getPrayersSettings);
        this.router.get(this.path + "/Prayers", this.getPrayers);
        this.router.get(this.path + "/PrayersViewDesktop", this.getPrayerView);
        //this.router.get(this.path + "/PrayersViewMobile", this.getPrayerViewRow);
        this.router.get(this.path + "/PrayersViewMobile", this.getPrayersByCalculation);
        this.router.put(this.path + "/PrayersSettings/:id", this.putPrayersSettings);
    }
    private getPrayersByCalculation = async (request: express.Request, response: express.Response,next:express.NextFunction) => {
        try{
        let prayerConfig: prayerlib.IPrayersConfig = this.buildPrayerConfigObject(request.query);
        debug(prayerConfig);
        let locationConfig: prayerlib.ILocationConfig = await new Configurator().getLocationConfig();
        this._prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        debug(this._prayerManager.getPrayerAdjsutments());
        response.json(this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers())));
        }catch(err)
        {
            debug(err);
            next(err);
        }
    }
    private buildPrayerConfigObject(prayerConfigObject: any): prayerlib.IPrayersConfig {
        for (var key in prayerConfigObject) {
            switch(key)
            {  
            case "_":  delete prayerConfigObject['_'];
              break;
              case"startDate":
              case "endDate":
              prayerConfigObject[key] = new Date(prayerConfigObject[key]);
              break;
              case"adjustments":
              let adjustmentArray: Array<any> = prayerConfigObject[key];
              for (var adjustkey in  adjustmentArray)
              {
                  adjustmentArray[adjustkey].adjustments= parseInt(adjustmentArray[adjustkey].adjustments);
              } 
              break;
              case "method":
              case "school":
              case "latitudeAdjustment":
              case "midnight":
              prayerConfigObject[key] = parseInt(prayerConfigObject[key]);
              break;
            }      
        }
        return prayerConfigObject;
    }
    private putPrayersSettings = (request: express.Request, response: express.Response) => {
        let prayerSettings: prayerlib.IPrayersSettings = request.body;


    }
    private getPrayerAdjsutments = (request: express.Request, response: express.Response) => {
        let prayerAdjustments: prayerlib.IPrayerAdjustments[] = this._prayerManager.getPrayerAdjsutments();
        response.json(prayerAdjustments);
    }

    private getPrayersSettings = (request: express.Request, response: express.Response) => {
        let prayersSettings: prayerlib.IPrayersSettings = (this._prayerManager.getPrayerSettings() as prayerlib.PrayersSettings).toJSON();
        response.json(prayersSettings);
    }
    private getPrayers = (request: express.Request, response: express.Response) => {
        let prayers: prayerlib.IPrayers[] = (this._prayerManager.getPrayers() as prayerlib.Prayers[]);
        response.json(prayers);
    }
    private getPrayerView = (request: express.Request, response: express.Response) => {

        let prayersView: IPrayersView[] = this.createPrayerView(this._prayerManager.getPrayers());
        response.json(prayersView);

    }
    private getPrayerViewRow = (request: express.Request, response: express.Response) => {
        let prayerViewRow: Array<IPrayersViewRow> = this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers()));
        response.json(prayerViewRow);

    }
    private createPrayerViewRow(prayersView: IPrayersView[]) {
        let prayerViewRow: Array<IPrayersViewRow> = new Array<IPrayersViewRow>();
        prayersView.forEach((prayerViewObject, index, arr) => {
            prayerViewRow.push(
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.FAJR, prayerTime: prayerViewObject.fajr },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNRISE, prayerTime: prayerViewObject.sunrise },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.DHUHR, prayerTime: prayerViewObject.dhuhr },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ASR, prayerTime: prayerViewObject.asr },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNSET, prayerTime: prayerViewObject.sunset },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MAGHRIB, prayerTime: prayerViewObject.maghrib },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ISHA, prayerTime: prayerViewObject.isha },
                { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MIDNIGHT, prayerTime: prayerViewObject.midnight });
        });
        return prayerViewRow;
    }

    private createPrayerView(prayers: prayerlib.IPrayers[]) {
        let prayerView: Array<IPrayersView> = new Array<IPrayersView>();
        let prayerViewObject: IPrayersView;
        let prayerTimings: Date[] = new Array<Date>();
        prayers.forEach((curr, index, arr) => {
            curr.prayerTime.forEach((prayerTiming, i) => {
                prayerTimings.push(prayerTiming.prayerTime);
            });
            prayerViewObject =
                {
                    prayerDate: moment(curr.prayersDate).format('YYYY-MM-DD'),
                    fajr: moment(prayerTimings[0]).format('LT'),
                    sunrise: moment(prayerTimings[1]).format('LT'),
                    dhuhr: moment(prayerTimings[2]).format('LT'),
                    asr: moment(prayerTimings[3]).format('LT'),
                    sunset: moment(prayerTimings[4]).format('LT'),
                    maghrib: moment(prayerTimings[5]).format('LT'),
                    isha: moment(prayerTimings[6]).format('LT'),
                    midnight: moment(prayerTimings[7]).format('LT')
                };
            prayerView.push(prayerViewObject);
        });
        return prayerView;
    }

    private async initializePrayerManger(): Promise<void> {
        let prayerConfig: prayerlib.IPrayersConfig = await new Configurator().getPrayerConfig();
        let locationConfig: prayerlib.ILocationConfig = await new Configurator().getLocationConfig();
        this._prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
            debug(this._prayerManager.getPrayerAdjsutments());
    }
    static getPrayerController(): PrayersController {

        return;

    }
}


