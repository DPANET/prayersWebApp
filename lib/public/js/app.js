"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as prayerlib from "@dpanet/prayers-lib";
const lowdb_1 = __importDefault(require("lowdb"));
const FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
const to = require('await-to-js').default;
buildObject();
async function buildObject() {
    try {
        // let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        // let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        // console.log(locationConfig);
        // let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
        //     .createPrayerTimeBuilder(locationConfig, prayerConfig)
        //     .createPrayerTimeManager();
        // console.log(prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR));
        // //let config:prayerlib.IConfig   = new prayerlib.Configurator();
        // let fajrAdjustment:number  = prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR).adjustments;
        // console.log(fajrAdjustment);
        let err, result;
        await getDB().then(result => result.get('config.prayerConfig.calculations').value());
        $("#fajr-time").val(result.method);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
async function getDB() {
    let _fileName = 'config/config.json';
    let _db;
    return _db = await lowdb_1.default(new FileAsync_1.default(_fileName));
}
