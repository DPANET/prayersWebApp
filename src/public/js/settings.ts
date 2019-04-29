// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
import * as prayerlib from "../../models/prayers.model";

export async function buildObject()
{
    try{
   
        $("#submit-button").on("click", () => { 
            $.ajax({ url: "PrayerManager/PrayersAdjustments/", success: (result)=>
            {
                loadPrayerAdjustments(result);
            }})}); 
    }
    catch(err)
    {
       alert(err);
    }
}
function loadPrayerAdjustments(prayerAdjustment:prayerlib.PrayerAdjustment[])
{

    prayerAdjustment.forEach(element => {
        switch(element.prayerName)
        {
            case "Fajr": $("#fajr-time").val(element.adjustments);
            break;
            case "Dhuhr":  $("#dhur-time").val(element.adjustments);
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
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;

//     return _db = await lowdb(new lowdbfile(_fileName));
// }

