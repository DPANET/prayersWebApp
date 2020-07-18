import Debug from 'debug';
const debug = Debug("app:router");
import express from 'express';
import config from "nconf";
import request from "request";
import { HttpException } from "../exceptions/exception.handler.js";
import sentry from "@sentry/node";
sentry.init({ dsn: config.get("DSN") });
export default class KeyController {
    constructor() {
        this.mainPageRoute = (req, res, next) => {
            try {
                let url = `https://maps.googleapis.com/maps/api/js?key=${this._googleKey}&libraries=places`;
                request.get(url).pipe(res);
            }
            catch (err) {
                debug(err);
                sentry.captureException(err);
                next(new HttpException(404, err.message));
            }
        };
        this.path = "/api/app/com.prayerssapp";
        this.router = express.Router();
        //  this._filePath = config.get("MAIN_FILE_PATH");
        //  this._fileName = config.get("MAIN_FILE_NAME");
        this._googleKey = config.get("GOOGLE_PLACE_KEY");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + "/Places", this.mainPageRoute);
    }
}
//# sourceMappingURL=keys.controller.js.map