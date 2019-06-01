"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_router_1 = require("./routes/main.router");
const prayers_controller_1 = __importDefault(require("./controllers/prayers.controller"));
const main_controller_1 = __importDefault(require("./controllers/main.controller"));
const events = __importStar(require("./events/events"));
const to = require('await-to-js').default;
let app = new main_router_1.App([new prayers_controller_1.default(), new main_controller_1.default()]);
let eventProvider = new events.ConfigEventProvider("config/config.json");
let eventListener = new events.ConfigEventListener();
eventProvider.registerListener(eventListener);
setTimeout(() => {
    app.listen();
}, 5000);
// setTimeout(()=>{doSomething()}, 5000);
// async function  doSomething()
// {        let err:Error, result: any, url: any;
// let queryString: any =
// {
//     uri: 'http://localhost:3005/PrayerManager/PrayersAdjustments/',
//     method: 'GET',
//     json: true,
//     resolveWithFullResponse: false
// };
// [err, result] = await to(request.get(queryString));
// console.log(result);
// console.log("Error: "+err);
// }
//# sourceMappingURL=app.js.map