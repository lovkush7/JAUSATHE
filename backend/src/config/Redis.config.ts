
import { createClient } from "redis"
import Envconfig from "./Envconfig.ts"

const redisclient = createClient({
url: Envconfig.REDIS_URL!
});

redisclient.on("connect", ()=>{
    console.log("redis connected")
})

redisclient.on("ready", ()=>{
    console.log("ready redis")
})

redisclient.on("error",(err)=>{
    console.log("the errror is ",err)
})

redisclient.on("reconnecting",()=>{
    console.log("redis reconnecting")
})

export async function connectRedis(){
    if(!redisclient.isOpen){
        await redisclient.connect()
    }
}


export default redisclient;