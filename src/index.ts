import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import * as prayersRouter  from "./routes/prayers-routes";
var app = express();
const port = config.get('PORT');
app.use('/',prayersRouter.router);
app.listen(port, ()=>console.log('Listening to port: '+ port ));
