import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import { runInNewContext } from "vm";
const app = express();
const port = config.get('PORT');
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname,"./public" )));
app.get('/',(req,res,next)=>
{   

    res.sendFile(path.join(__dirname,"/index.html"));
    next();
});
app.listen(port, ()=>console.log('Listening to port: '+ port ));
