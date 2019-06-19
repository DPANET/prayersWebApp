"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require('debug')('app:router');
const express_1 = __importDefault(require("express"));
const nconf_1 = __importDefault(require("nconf"));
class KeyController {
    constructor() {
        this.placesRouter = (request, response) => {
            response.json("test");
            //response.sendFile(`https://maps.googleapis.com/maps/api/js?key=${this._googleKey}&libraries=places`,{index:false,dotfiles:"allow",redirect:true});
        };
        this.path = "/Keys";
        this.router = express_1.default.Router();
        this._googleKey = nconf_1.default.get("GOOGLE_PLACE_KEY");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path + "/Places/", this.placesRouter);
    }
}
exports.default = KeyController;
//# sourceMappingURL=keys.controller.js.map