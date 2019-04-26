"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
var app = express_1.default();
const port = config_1.default.get('PORT');
app.use(express_1.default.static('lib/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.listen(port, () => console.log('Listening to port: ' + port));
