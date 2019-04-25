"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = config_1.default.get('PORT');
app.use(morgan_1.default('tiny'));
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/index.html"));
});
app.listen(port, () => console.log('Listening to port: ' + port));
