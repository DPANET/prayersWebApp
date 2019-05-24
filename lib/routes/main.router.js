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
const bodyParser = __importStar(require("body-parser"));
const exceptionMiddleware = __importStar(require("../middlewares/exceptions.middleware"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorMiddleware();
        this._port = config_1.default.get("PORT");
    }
    listen() {
        this.app.listen(this._port, () => {
            console.log(`App listening on the port ${this._port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express_1.default.static('lib/public'));
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