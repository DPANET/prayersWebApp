"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const prayerlib = __importStar(require("@dpanet/prayers-lib"));
buildObject();
async function buildObject() {
    try {
        let prayerConfig = await new prayerlib.Configurator().getPrayerConfig();
        let locationConfig = await new prayerlib.Configurator().getLocationConfig();
        let prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        let config = new prayerlib.Configurator();
        let fajrAdjustment = prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR).adjustments;
        console.log(fajrAdjustment);
        $("#fajr-time").val(2);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
    }
}
exports.buildObject = buildObject;
