
import {IController} from "./controllers.interface";
import express from 'express';
import path from 'path';
import config from "config";
export default class MainController implements IController

{

    path: string;
    router: express.Router;
    private _filePath:string;
    constructor()
    {
        this.path = "/";
        this.router= express.Router();
        this._filePath = config.get("MAIN_FILE_PATH");
        this.initializeRoutes();
        
    }
    private initializeRoutes() {
        this.router.get(this.path, this.mainPageRoute);
      }
    private mainPageRoute=  (request: express.Request, response: express.Response)=>
    {
        response.sendFile(path.join(__dirname,this._filePath));
    }

}