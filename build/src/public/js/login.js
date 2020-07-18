import moment2 from "https://github.com/DPANET/prayersWebApp#readme/web_modules/moment.js";
import {PrayerType} from "https://github.com/DPANET/prayersWebApp#readme/web_modules/@dpanet/prayers-lib/lib/entities/prayer.js";
import gapi from "https://github.com/DPANET/prayersWebApp#readme/web_modules/googleapi.js";
export async function login() {
  let startDate = moment2(new Date());
  let endDate = moment2(new Date()).add(1, "M");
  console.log(endDate);
  console.log(PrayerType.Fardh);
  init();
}
function init() {
  gapi.load("auth2", function() {
  });
}
login();
