import  {App} from "./routes/main.router";
import prayersController from "./controllers/prayers.controller";
import mainController from "./controllers/main.controller";
import keyController from "./controllers/keys.controller";

import * as  events from "./events/events";
let app:App = new App([new prayersController(),new mainController(),new keyController()]);
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