// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
import * as prayerlib from "../../models/prayers.model";

export async function buildObject()
{
    try{
        // let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        // let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        // console.log(locationConfig);
        // let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
        //     .createPrayerTimeBuilder(locationConfig, prayerConfig)
        //     .createPrayerTimeManager();
        // console.log(prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR));
        // //let config:prayerlib.IConfig   = new prayerlib.Configurator();
        // let fajrAdjustment:number  = prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR).adjustments;
        
        // // console.log(fajrAdjustment);
     
        //  let err: Error, result: any;
        //  await getDB().then(result => result.get('config.prayerConfig.calculations').value());
   
        $("#submit-button").on("click", () => { 
            $.ajax({ url: "PrayerManager/PrayersAdjustments/", success: function (result: any)
            {
                let prayerAdjustment:prayerlib.PrayerAdjustment[] = result;
                $('fajr-time').val(prayerAdjustment[1].adjustments);
                $('dhur-time').val(prayerAdjustment[2].adjustments);
                alert($('fajr-time').val(prayerAdjustment[1].adjustments));
                
            } })}); 
    }
    catch(err)
    {
       alert(err);
    }
}
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;

//     return _db = await lowdb(new lowdbfile(_fileName));
// }

