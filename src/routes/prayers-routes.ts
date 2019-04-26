import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
export var router = express();
router.use(express.static('lib/public'));
var file = require.resolve('../index.html');
router.get('/',(req,res)=>
{   
   // res.sendFile(__dirname+"/index.html");
   res.sendFile(file,);

    //res.json({a:5});
});

