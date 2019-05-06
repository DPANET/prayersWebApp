import mainRouter from "./routes/main.router";
import prayersController from "./controllers/prayers.controller";
import mainController from "./controllers/main.controller";
const to = require('await-to-js').default;
const app = new mainRouter([new prayersController(), new mainController()]);
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
