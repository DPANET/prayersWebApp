import { IController } from "./controllers.interface";
import express from 'express';
export default class MainController implements IController {
    path: string;
    router: express.Router;
    private _filePath;
    constructor();
    private initializeRoutes;
    private mainPageRoute;
}
