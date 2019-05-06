import * as prayerlib from "@dpanet/prayers-lib";
import express from 'express';
import moment from "moment";
export default class PrayersController {
    constructor() {
        this.getPrayersByCalculation = async (request, response) => {
            let prayerConfig = request.params.prayerConfig;
            let locationConfig = await new prayerlib.Configurator().getLocationConfig();
            this._prayerManager = await prayerlib.PrayerTimeBuilder
                .createPrayerTimeBuilder(locationConfig, prayerConfig)
                .createPrayerTimeManager();
            response.json(this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers())));
        };
        this.putPrayersSettings = (request, response) => {
            let prayerSettings = request.body;
        };
        this.getPrayerAdjsutments = (request, response) => {
            let prayerAdjustments = this._prayerManager.getPrayerAdjsutments();
            response.json(prayerAdjustments);
        };
        this.getPrayersSettings = (request, response) => {
            let prayersSettings = this._prayerManager.getPrayerSettings().toJSON();
            response.json(prayersSettings);
        };
        this.getPrayers = (request, response) => {
            let prayers = this._prayerManager.getPrayers();
            response.json(prayers);
        };
        this.getPrayerView = (request, response) => {
            let prayersView = this.createPrayerView(this._prayerManager.getPrayers());
            response.json(prayersView);
        };
        this.getPrayerViewRow = (request, response) => {
            let prayerViewRow = this.createPrayerViewRow(this.createPrayerView(this._prayerManager.getPrayers()));
            response.json(prayerViewRow);
        };
        this.path = "/PrayerManager";
        this.router = express.Router();
        this.initializeRoutes();
        this.initializePrayerManger();
    }
    initializeRoutes() {
        this.router.get(this.path + "/PrayersAdjustments", this.getPrayerAdjsutments);
        this.router.get(this.path + "/PrayersSettings", this.getPrayersSettings);
        this.router.get(this.path + "/Prayers", this.getPrayers);
        this.router.get(this.path + "/PrayersViewDesktop", this.getPrayerView);
        this.router.get(this.path + "/PrayersViewMobile", this.getPrayerViewRow);
        this.router.get(this.path + "/PrayersViewMobile/:prayerconfig", this.getPrayersByCalculation);
        this.router.put(this.path + "/PrayersSettings/:id", this.putPrayersSettings);
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
    async initializePrayerManger() {
        let prayerConfig = await new prayerlib.Configurator().getPrayerConfig();
        let locationConfig = await new prayerlib.Configurator().getLocationConfig();
        this._prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        console.log(this._prayerManager.getPrayerAdjsutments());
    }
    static getPrayerController() {
        return;
    }
}
