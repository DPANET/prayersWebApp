//import moment from "/web_modules/moment.js";
//import * as prayerlib from "/web_modules/@dpanet/prayers-lib/lib/entities/prayer.js";
//import moment from "@snownode/moment.js";
//import * as prayerlib from "@snownode/@dpanet/prayers-lib.js";
import moment from "moment";
import  {PrayerType}from "@dpanet/prayers-lib/lib/entities/prayer";
//import google from "@google/maps"
import gapi from "googleapi";
export async function login() {
    let startDate:moment.Moment= moment(new Date());//moment(prayerSettings.startDate),
    let endDate:moment.Moment= moment(new Date()).add(1, "M")//moment(prayerSettings.endDate)
    console.log(endDate);
    console.log(PrayerType.Fardh);
    init();
    
 
}
function init() {
    gapi.load('auth2', function() {
      /* Ready. Make a call to gapi.auth2.init or some other API */
    });
    
  }
login();