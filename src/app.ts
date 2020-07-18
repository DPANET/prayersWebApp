import nconf from 'nconf';
nconf.file('config/default.json');
process.env.DEBUG= nconf.get("DEBUG");
import prayersController from "./controllers/prayers.controller";
import keyController from "./controllers/keys.controller.js";
import mainController from "./controllers/main.controller.js";
import  {App} from "./routes/main.router.js";


let app:App;
try{

app= new App([new mainController(),new keyController()]);
// let eventProvider:events.ConfigEventProvider = new events.ConfigEventProvider("config/config.json");
// let eventListener:events.ConfigEventListener = new events.ConfigEventListener();
// eventProvider.registerListener(eventListener);
setTimeout(() => {
    app.listen();
}, 5000);
}
catch(err)
{
    console.log(err)
}
finally
{
    
}

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