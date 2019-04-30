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
const prayerlib = __importStar(require("@dpanet/prayers-lib"));
const express_1 = __importDefault(require("express"));
class PrayersController {
    constructor() {
        this.getPrayerAdjsutments = (request, response) => {
            let prayerAdjustments = this._prayerManager.getPrayerAdjsutments();
            response.json(prayerAdjustments);
        };
        this.getPrayersSettings = (request, response) => {
            let prayersSettings = this._prayerManager.getPrayerSettings().toJSON();
            response.json(prayersSettings);
        };
        this.path = "/PrayerManager";
        this.router = express_1.default.Router();
        this.initializeRoutes();
        this.initializePrayerManger();
    }
    initializeRoutes() {
        this.router.get(this.path + "/PrayersAdjustments", this.getPrayerAdjsutments);
        this.router.get(this.path + "/PrayersSettings", this.getPrayersSettings);
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
exports.default = PrayersController;
