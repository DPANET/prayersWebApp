import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import * as bodyParser from 'body-parser';
import IController from "../controllers/controllers.interface";
import * as prayerController from "../controllers/prayers.controller"

class App {
  public app: express.Application;
  private _port: number;
  constructor(controllers: IController[]) {
    this.app = express();
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this._port = config.get("PORT");
  }
 
  public listen():void {
    this.app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }
 
  private initializeMiddlewares():void {
    this.app.use(bodyParser.json());
    this.app.use()
  }
 
  private initializeControllers(controllers: IController[]):void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  }
}
 
export default App;