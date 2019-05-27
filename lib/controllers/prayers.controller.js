"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
const prayerlib = __importStar(require("@dpanet/prayers-lib"));
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const configuration_1 = __importDefault(require("@dpanet/prayers-lib/lib/configurators/configuration"));
const exception_handler_1 = require("../exceptions/exception.handler");
const sentry = __importStar(require("@sentry/node"));
const validationController = __importStar(require("../middlewares/validations.middleware"));
const prayers_lib_1 = require("@dpanet/prayers-lib");
sentry.init({ dsn: process.env.DSN });
class PrayersController {
    constructor() {
        this.validateConfig = async (request, response, next) => {
            // await this._validationController.validationMiddleware(validators.ConfigValidator.createValidator(),request.query);
            // next();
        };
        this.getPrayersByCalculation = async (request, response, next) => {
            try {
                let prayerConfig = this.buildPrayerConfigObject(request.query);
                debug(prayerConfig);
                let locationConfig = await new configuration_1.default().getLocationConfig();
                this._prayerManager = await prayerlib.PrayerTimeBuilder
                    .createPrayerTimeBuilder(locationConfig, prayerConfig)
                    .createPrayerTimeManager();
                debug(this._prayerManager.getPrayerAdjsutments());
                response.json(this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers())));
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.putPrayersSettings = (request, response) => {
            let prayerSettings = request.body;
        };
        this.getPrayerAdjsutments = (request, response, next) => {
            try {
                let prayerAdjustments = this._prayerManager.getPrayerAdjsutments();
                response.json(prayerAdjustments);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.getPrayersSettings = (request, response, next) => {
            try {
                let prayersSettings = this._prayerManager.getPrayerSettings().toJSON();
                response.json(prayersSettings);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.getPrayers = (request, response, next) => {
            try {
                let prayers = this._prayerManager.getPrayers();
                response.json(prayers);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.getPrayerView = (request, response, next) => {
            try {
                let prayersView = this.createPrayerView(this._prayerManager.getPrayers());
                response.json(prayersView);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.getPrayerViewRow = (request, response, next) => {
            try {
                let prayerViewRow = this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers()));
                response.json(prayerViewRow);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.HttpException(404, err.message));
            }
        };
        this.path = "/PrayerManager";
        this.router = express_1.default.Router();
        this._validationController = new validationController.ValidationMiddleware();
        this.initializeRoutes();
        this.initializePrayerManger();
    }
    initializeRoutes() {
        this.router.get(this.path + "/PrayersAdjustments", this.getPrayerAdjsutments);
        this.router.get(this.path + "/PrayersSettings", this.getPrayersSettings);
        this.router.get(this.path + "/Prayers", this.getPrayers);
        this.router.get(this.path + "/PrayersViewDesktop", this.getPrayerView);
        //this.router.get(this.path + "/PrayersViewMobile", this.getPrayerViewRow);
        this.router.get(this.path + "/PrayersViewMobile", this._validationController.validationMiddleware(prayers_lib_1.validators.ConfigValidator.createValidator()), this.getPrayersByCalculation);
        this.router.put(this.path + "/PrayersSettings/:id", this.putPrayersSettings);
    }
    buildPrayerConfigObject(prayerConfigObject) {
        for (var key in prayerConfigObject) {
            switch (key) {
                case "_":
                    delete prayerConfigObject['_'];
                    break;
                case "startDate":
                case "endDate":
                    prayerConfigObject[key] = new Date(prayerConfigObject[key]);
                    break;
                case "adjustments":
                    let adjustmentArray = prayerConfigObject[key];
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
    createPrayerViewRow(prayersView) {
        let prayerViewRow = new Array();
        prayersView.forEach((prayerViewObject, index, arr) => {
            prayerViewRow.push({ prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.FAJR, prayerTime: prayerViewObject.fajr }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNRISE, prayerTime: prayerViewObject.sunrise }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.DHUHR, prayerTime: prayerViewObject.dhuhr }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ASR, prayerTime: prayerViewObject.asr }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNSET, prayerTime: prayerViewObject.sunset }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MAGHRIB, prayerTime: prayerViewObject.maghrib }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ISHA, prayerTime: prayerViewObject.isha }, { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MIDNIGHT, prayerTime: prayerViewObject.midnight });
        });
        return prayerViewRow;
    }
    createPrayerView(prayers) {
        let prayerView = new Array();
        let prayerViewObject;
        let prayerTimings = new Array();
        prayers.forEach((curr, index, arr) => {
            curr.prayerTime.forEach((prayerTiming, i) => {
                prayerTimings.push(prayerTiming.prayerTime);
            });
            prayerViewObject =
                {
                    prayerDate: moment_1.default(curr.prayersDate).format('YYYY-MM-DD'),
                    fajr: moment_1.default(prayerTimings[0]).format('LT'),
                    sunrise: moment_1.default(prayerTimings[1]).format('LT'),
                    dhuhr: moment_1.default(prayerTimings[2]).format('LT'),
                    asr: moment_1.default(prayerTimings[3]).format('LT'),
                    sunset: moment_1.default(prayerTimings[4]).format('LT'),
                    maghrib: moment_1.default(prayerTimings[5]).format('LT'),
                    isha: moment_1.default(prayerTimings[6]).format('LT'),
                    midnight: moment_1.default(prayerTimings[7]).format('LT')
                };
            prayerView.push(prayerViewObject);
        });
        return prayerView;
    }
    async initializePrayerManger() {
        try {
            let prayerConfig = await new configuration_1.default().getPrayerConfig();
            let locationConfig = await new configuration_1.default().getLocationConfig();
            this._prayerManager = await prayerlib.PrayerTimeBuilder
                .createPrayerTimeBuilder(locationConfig, prayerConfig)
                .createPrayerTimeManager();
            debug(this._prayerManager.getPrayerAdjsutments());
        }
        catch (err) {
            debug(err);
            sentry.captureException(err);
            throw err;
        }
    }
    static getPrayerController() {
        return;
    }
}
exports.default = PrayersController;
//# sourceMappingURL=prayers.controller.js.map