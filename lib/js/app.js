"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prayerlib = require("@dpanet/prayers-lib");
buildObject();
async function buildObject() {
    try {
        let prayerConfig = await new prayerlib.Configurator().getPrayerConfig();
        let locationConfig = await new prayerlib.Configurator().getLocationConfig();
        console.log(locationConfig);
        let prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        let config = new prayerlib.Configurator();
        $("#fajr-time").val(3);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
    }
}
exports.buildObject = buildObject;
