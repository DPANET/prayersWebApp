"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_router_1 = __importDefault(require("./routes/main.router"));
const prayers_controller_1 = __importDefault(require("./controllers/prayers.controller"));
const main_controller_1 = __importDefault(require("./controllers/main.controller"));
const app = new main_router_1.default([new prayers_controller_1.default(), new main_controller_1.default()]);
app.listen();
