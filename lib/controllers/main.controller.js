import express from 'express';
import path from 'path';
export default class MainController {
    constructor() {
        this.mainPageRoute = (request, response) => {
            response.sendFile(path.join(__dirname, "../index.html"));
        };
        this.path = "/";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.mainPageRoute);
    }
}
