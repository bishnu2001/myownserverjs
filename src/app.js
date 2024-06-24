import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
// import {RouterPlugin,ListenerPlugin} from "./plugins"
import * as RouterPlugin from "./plugins/router.plugin.js";
import * as ListenerPlugin from "./plugins/listener.plugin.js";
const app=express();

app.use(cors())
    .use(express.json({limit:"500mb"}))
    .use(express.urlencoded({extended:true}))
    .use(helmet())
    .use(fileUpload())
async function main(){
    mongoose.connect();
    console.log("db connection successfull")
}
main();
RouterPlugin.setup(app)
ListenerPlugin.listen(app)
