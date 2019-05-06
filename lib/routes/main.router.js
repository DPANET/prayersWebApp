import express from "express";
import config from "config";
import morgan from "morgan";
import * as bodyParser from 'body-parser';
class App {
    constructor(controllers) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this._port = config.get("PORT");
    }
    listen() {
        this.app.listen(this._port, () => {
            console.log(`App listening on the port ${this._port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.static('lib/public'));
        this.app.use(morgan('tiny'));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    connectToTheDatabase() {
    }
}
export default App;
