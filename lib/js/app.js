"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function buildObject() {
    try {
        // let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        // let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        // console.log(locationConfig);
        // let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
        //     .createPrayerTimeBuilder(locationConfig, prayerConfig)
        //     .createPrayerTimeManager();
        // let config:prayerlib.IConfig   = new prayerlib.Configurator();
        $("#fajr-time").val(3);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
    }
}
exports.buildObject = buildObject;
