"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const prayersManagerRouter = __importStar(require("./routes/main.router"));
var app = express_1.default();
const port = config_1.default.get('PORT');
app.use('/prayersmanager', prayersManagerRouter.router);
app.listen(port, () => console.log('Listening to port: ' + port));
