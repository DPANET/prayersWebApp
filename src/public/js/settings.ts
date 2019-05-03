// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
import * as prayerlib from "../../models/prayers.model";
import daterangepicker from "daterangepicker";
import moment from "moment";
const datatable = require("datatables.net");
export async function buildObject() {
    try {
        setTimeout(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();

        }, 5000);

        $("#view-button").on("click",loadDataTable);
    }
    catch (err) {
        alert(err);
    }
}
function loadDataTable()
{
    $.ajax({
        url: "PrayerManager/Prayers", success: (prayers: prayerlib.IPrayers[]) => {
            
        }
    });
}

function loadPrayerPrayerSettings() {
    $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings: prayerlib.IPrayersSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
            $('input[name="daterange"]').daterangepicker(
                    {
                        startDate:moment(prayerSettings.startDate),
                        endDate:moment(prayerSettings.endDate)
                    }
            )       
        }
    });
}
function loadPrayerAdjustments() {

    $.ajax({
        url: "PrayerManager/PrayersAdjustments/", success: (prayerAdjustment: prayerlib.IPrayerAdjustments[]) => {

            prayerAdjustment.forEach(element => {
                switch (element.prayerName) {
                    case "Fajr": $("#fajr-time").val(element.adjustments);
                        break;
                    case "Dhuhr": $("#dhur-time").val(element.adjustments);
                        break;
                    case "Asr": $("#asr-time").val(element.adjustments);
                        break;
                    case "Maghrib": $("#maghrib-time").val(element.adjustments);
                        break;
                    case "Isha": $("#isha-time").val(element.adjustments);
                        break;
                }
            });
        }
    });
}
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;

//     return _db = await lowdb(new lowdbfile(_fileName));
// }

