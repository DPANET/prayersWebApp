import dontenv= require('dotenv');
dontenv.config();
import  {App} from "./routes/main.router";
import prayersController from "./controllers/prayers.controller";
import mainController from "./controllers/main.controller";

import * as  events from "./events/events";
const to = require('await-to-js').default;
let app:App = new App([new prayersController(),new mainController()]);
// let eventProvider:events.ConfigEventProvider = new events.ConfigEventProvider("config/config.json");
// let eventListener:events.ConfigEventListener = new events.ConfigEventListener();
// eventProvider.registerListener(eventListener);
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