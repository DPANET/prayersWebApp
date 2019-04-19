
import $ from "jquery";
import * as prayerlib from '@dpanet/prayers-lib';
import { isNullOrUndefined } from 'util';
import cg = require("./configurators/configuration");

$("#submit-button").click(()=> { 
    alert('hi');

});

async function buildObject()
{
    try{


        let prayerConfig: prayerlib.IPrayersConfig;
        let locationConfig: prayerlib.ILocationConfig;
        

        prayerConfig= await new prayerlib.Configurator().getPrayerConfig();
        locationConfig = await new prayerlib.Configurator().getLocationConfig();
        appmanager._prayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(null, appmanager._prayerConfig)
            .setPrayerMethod(prayerlib.Methods.Mecca)
          //  .setPrayerPeriod(prayerlib.DateUtil.getNowDate(), prayerlib.DateUtil.addDay(1, prayerlib.DateUtil.getNowDate()))
            .setLocationByCoordinates(Homey.ManagerGeolocation.getLatitude(), Homey.ManagerGeolocation.getLongitude())
            .createPrayerTimeManager();
        appmanager.initPrayersSchedules();
        appmanager.initEvents();
        console.log(appmanager._prayerManager.getUpcomingPrayer());

    }
    catch(err)
    {

    }

}