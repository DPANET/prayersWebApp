"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class MainController {
    constructor() {
        this.mainPageRoute = (request, response) => {
            response.sendFile(path_1.default.join(__dirname, "../index.html"));
        };
        this.path = "/";
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.mainPageRoute);
    }
}
exports.default = MainController;
//# sourceMappingURL=main.controller.js.map