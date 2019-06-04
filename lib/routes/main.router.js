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
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const bodyParser = __importStar(require("body-parser"));
const exceptionMiddleware = __importStar(require("../middlewares/exceptions.middleware"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this._mainFolder = config_1.default.get('WEBROOT');
        this._stataicFolder = config_1.default.get('STATIC_FILES');
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorMiddleware();
        this._port = config_1.default.get("PORT");
    }
    listen() {
        https_1.default.createServer({
            key: fs_1.default.readFileSync(config_1.default.get("KEY")),
            cert: fs_1.default.readFileSync(config_1.default.get("CERT")),
            passphrase: config_1.default.get("PASSPHRASE")
        }, this.app).listen(this._port, () => {
            console.log(`App listening on the port ${this._port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express_1.default.static(path_1.default.join(this._mainFolder, this._stataicFolder)));
        this.app.use(morgan_1.default('tiny'));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeErrorMiddleware() {
        this._excpetionMiddleware = new exceptionMiddleware.ExceptionMiddleware();
        this.app.use(this._excpetionMiddleware.errorMiddleware);
    }
    connectToTheDatabase() {
    }
}
exports.App = App;
//# sourceMappingURL=main.router.js.map