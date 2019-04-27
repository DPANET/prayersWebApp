import * as prayerlib from "@dpanet/prayers-lib";
import IController from "./controllers.interface";
export class PrayersController implements IController
{
    path: string;
    router: import("express").Router;
    private _prayersController:PrayersController;

    constructor()
    {// {
    //             let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
    //     let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
    //     console.log(locationConfig);
    //     let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
    //         .createPrayerTimeBuilder(locationConfig, prayerConfig)
    //         .createPrayerTimeManager();
    }
    static getPrayerController(): PrayersController
    {

        return ;

    }
}
