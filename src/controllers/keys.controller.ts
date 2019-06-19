const debug = require('debug')('app:router');
import { IController } from "./controllers.interface";
import express from 'express';
import path from 'path';
import config from "nconf";
export default class KeyController implements IController {
    path: string;
    router: express.Router;
    private _googleKey: string;
    constructor() {
        this.path = "/Keys";
        this.router = express.Router();
        this._googleKey = config.get("GOOGLE_PLACE_KEY");
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path+"/Places/", this.placesRouter);
    }
    private placesRouter = (request: express.Request, response: express.Response) => {
        response.json("test");
       //response.sendFile(`https://maps.googleapis.com/maps/api/js?key=${this._googleKey}&libraries=places`,{index:false,dotfiles:"allow",redirect:true});

    }
}
