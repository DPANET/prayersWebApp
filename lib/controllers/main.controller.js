"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("config"));
class MainController {
    constructor() {
        this.mainPageRoute = (request, response) => {
            response.sendFile(path_1.default.join(__dirname, this._filePath), { index: false, dotfiles: "allow", redirect: true });
        };
        this.path = "/";
        this.router = express_1.default.Router();
        this._filePath = config_1.default.get("MAIN_FILE_PATH");
        this._fileName = config_1.default.get("MAIN_FILE_NAME");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.mainPageRoute);
    }
}
exports.default = MainController;
//# sourceMappingURL=main.controller.js.map