import IController from "./controllers.interface";
import { Router } from 'express';
export default class PrayersController implements IController {
    path: string;
    router: Router;
    private _prayersController;
    constructor();
    static getPrayerController(): PrayersController;
}
