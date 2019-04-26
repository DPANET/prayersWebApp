import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
var app = express();
const port = config.get('PORT');
app.use(express.static('lib/public'));
app.get('/',(req,res)=>
{   
    res.sendFile(__dirname+"/index.html");
    
});
app.listen(port, ()=>console.log('Listening to port: '+ port ));
