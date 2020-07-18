import { IController } from "./controllers.interface.js";
import express from 'express';
export default class KeyController implements IController {
    path: string;
    router: express.Router;
    private _googleKey;
    constructor();
    private initializeRoutes;
    private mainPageRoute;
}
