import http from "http";
import { configs } from "../config";

export const ListenerPlugin={
    listen(app){
        const server=http.createServer(app);
        server.listen(configs.PORT,()=>{
            console.log(`\n server running on port ${configs.PORT}`)
        })
    }
}