import * as prayerlib from "@dpanet/prayers-lib";


buildObject();
export async function buildObject()
{
    try{


        let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
            .createPrayerTimeBuilder(locationConfig, prayerConfig)
            .createPrayerTimeManager();
        
        let config:prayerlib.IConfig   = new prayerlib.Configurator();
        let fajrAdjustment:number  = prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR).adjustments;
        
        console.log(fajrAdjustment);
        
        $("#fajr-time").val(2);
        $("#submit-button").on("click",()=>{alert('Hi');});
    }
    catch(err)
    {

    }

}

