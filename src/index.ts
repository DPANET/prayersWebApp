import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import * as prayersManagerRouter  from "./routes/prayers-router";
var app = express();
const port = config.get('PORT');
app.use('/prayersmanager',prayersManagerRouter.router);
app.listen(port, ()=>console.log('Listening to port: '+ port ));
