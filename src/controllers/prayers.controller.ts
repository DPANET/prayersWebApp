const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
import config = require('config');
import * as prayerlib from "@dpanet/prayers-lib";
import { IController } from "./controllers.interface";
import {IPrayersView,IPrayersViewRow} from "./views.interface";
import express from 'express';
import moment from "moment";
//import { NextFunction, NextHandleFunction } from "connect";
import { HttpException } from "../exceptions/exception.handler";
import * as sentry from "@sentry/node";
import * as validationController from "../middlewares/validations.middleware"
import * as validators from "../validators/validations";
import * as retry from "async-retry";
sentry.init({ dsn: config.get("DSN") });
export default class PrayersController implements IController {
    path: string;
    router: express.Router;
    private _prayersController: PrayersController;
    private _prayerManager: prayerlib.IPrayerManager;
    private _validationController: validationController.ValidationMiddleware;
    private _validatePrayerManager:Function;
    private _validateConfigParam:Function;
    private _validateConfigBody:Function;
    constructor() {
        try {
        
            this.path = "/PrayerManager";
            this.router = express.Router();
            this._validationController = new validationController.ValidationMiddleware();
            
            this.initializeValidators();
          //  this.prayerViewMobileRequestValidator =
            this.initializePrayerManger()
            .then(()=> {

            })
            .catch((err)=> {throw err});
       
            this.initializeRoutes();
        }
        catch (err) {
            throw err;
        }
    }
    private initializeValidators()
    {
        this._validatePrayerManager=this._validationController
        .validationMiddlewareByObject.bind(this, validators.PrayerMangerValidator.createValidator());
        this._validateConfigParam= this._validationController.validationMiddlewareByRequest
        .bind(this, validators.ConfigValidator.createValidator(),validationController.ParameterType.query);
        this._validateConfigBody = this._validationController.validationMiddlewareByRequest
        .bind(this, validators.ConfigValidator.createValidator(),validationController.ParameterType.body);
  
    }
    private initializeRoutes() {
    this.router.get(this.path + "/PrayersAdjustments",this.validatePrayerManagerRequest,this.getPrayerAdjsutments);
        this.router.get(this.path + "/PrayersSettings",this.validatePrayerManagerRequest,this.getPrayersSettings);
        this.router.get(this.path + "/Prayers",  this.validatePrayerManagerRequest,this.getPrayers);
        this.router.get(this.path + "/PrayersViewDesktop", this.validatePrayerManagerRequest,this.getPrayerView);
        this.router.get(this.path + "/PrayersViewMobile",this._validateConfigParam(),this.getPrayersByCalculation);
        this.router.get(this.path+"/LoadSettings",this.reloadConfig)
        this.router.post(this.path + "/PrayersViewMobile/",  this._validateConfigBody(),this.updatePrayersByCalculation);
      //  this.router.put(this.path + "/PrayersSettings/:id", this.putPrayersSettings);
    } 
    private reloadConfig = async(request: express.Request, response: express.Response, next: express.NextFunction)=>
    {
        try{
            await this.initializePrayerManger();
            response.json('ok');
        }
        catch(err)
        {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));

        }
    }
    private validatePrayerManagerRequest=async(request: express.Request, response: express.Response, next: express.NextFunction)=>
    {
        try{
        let fn:express.RequestHandler = this._validatePrayerManager(this._prayerManager);
        fn(request,response,next);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }
    }
    private getPrayerManager()
    {
        return this._prayerManager;
    }

    private updatePrayersByCalculation = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayerConfig: prayerlib.IPrayersConfig = this.buildPrayerConfigObject(request.body);
            let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
            await this._prayerManager.savePrayerConfig(prayerConfig);
           // prayerConfig = await new prayerlib.Configurator().getPrayerConfig();
           // this._prayerManager = await this.refreshPrayerManager(prayerConfig,locationConfig)
            response.json("completed");
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }
    }
    private getPrayersByCalculation = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayerConfig: prayerlib.IPrayersConfig = this.buildPrayerConfigObject(request.query);
            debug(prayerConfig);
            let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
            this._prayerManager = await this.refreshPrayerManager(prayerConfig, locationConfig);
            debug(this._prayerManager.getPrayerAdjsutments());
            response.json(this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers())));
        } catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }
    }
    
  
    private buildPrayerConfigObject(prayerConfigObject: any): prayerlib.IPrayersConfig {
        for (var key in prayerConfigObject) {
            switch (key) {
                case "_": delete prayerConfigObject['_'];
                    break;
                case "startDate":
                case "endDate":
                    prayerConfigObject[key] = new Date(prayerConfigObject[key]);
                    break;
                case "adjustments":
                    let adjustmentArray: Array<any> = prayerConfigObject[key];
                    for (var adjustkey in adjustmentArray) {
                        adjustmentArray[adjustkey].adjustments = parseInt(adjustmentArray[adjustkey].adjustments);
                    }
                    break;
                case "method":
                case "school":
                case "latitudeAdjustment":
                case "midnight":
                case "adjustmentMethod":
                    prayerConfigObject[key] = parseInt(prayerConfigObject[key]);
                    break;
            }
        }
        return prayerConfigObject;
    }
    private putPrayersSettings = (request: express.Request, response: express.Response) => {
        let prayerSettings: prayerlib.IPrayersSettings = request.body;
    }
    private getPrayerAdjsutments = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayerAdjustments: prayerlib.IPrayerAdjustments[] = this._prayerManager.getPrayerAdjsutments();
            response.json(prayerAdjustments);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }
    }

    private getPrayersSettings = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayersSettings: prayerlib.IPrayersSettings = (this._prayerManager.getPrayerSettings() as prayerlib.PrayersSettings).toJSON();
            response.json(prayersSettings);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }
    }
    private getPrayers = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayers: prayerlib.IPrayers[] = (this._prayerManager.getPrayers() as prayerlib.Prayers[]);
            response.json(prayers);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);

            next(new HttpException(404, err.message));
        }
    }
    private getPrayerView = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let prayersView: IPrayersView[] = this.createPrayerView(this._prayerManager.getPrayers());
            response.json(prayersView);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            next(new HttpException(404, err.message));
        }

    }
    private getPrayerViewRow = (request: express.Request, response: express.Response, next:express. NextFunction) => {
        try {
            let prayerViewRow: Array<IPrayersViewRow> = this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers()));
            response.json(prayerViewRow);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);

            next(new HttpException(404, err.message));
        }
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
    private async refreshPrayerManager(prayerConfig: prayerlib.IPrayersConfig, locationConfig: prayerlib.ILocationConfig): Promise<prayerlib.IPrayerManager> {
        let count: number = 0
        try {
           return await retry.default(async bail => {
                count += 1;
                debug(`the number is now reached ${count}`);
                let _prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
                    .createPrayerTimeBuilder(locationConfig, prayerConfig)
                    .createPrayerTimeManager();
                return _prayerManager;
            }
                , {
                    retries: 1,
                    minTimeout: 1000
                })
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    private async initializePrayerManger(): Promise<void> {
        try {
            let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
            let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
            this._prayerManager = await this.refreshPrayerManager(prayerConfig, locationConfig);
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            throw err;
        }
    }
    static getPrayerController(): PrayersController {

        return;

    }
}


