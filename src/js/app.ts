//import * as prayerlib from "@dpanet/prayers-lib";
import lowdb from "lowdb";
import lowdbfile from "lowdb/adapters/FileAsync";
const to = require('await-to-js').default;
import _ = require('lodash');
buildObject();
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
        
        // console.log(fajrAdjustment);
     
         let err: Error, result: any;
         await getDB().then(result => result.get('config.prayerConfig.calculations').value());
         $("#fajr-time").val(result.method);
        $("#submit-button").on("click",()=>{alert('Hi');});
    }
    catch(err)
    {
       alert(err);
    }

}
 async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
    let _fileName: string = 'config/config.json';  
    let _db: lowdb.LowdbAsync<any>;

    return _db = await lowdb(new lowdbfile(_fileName));
}

