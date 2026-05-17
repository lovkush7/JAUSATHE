import "reflect-metadata"
import AppDataSource from "./config/database.config.ts"
import express from "express"
import Envconfig from "./config/Envconfig.ts"

const app = express()

AppDataSource.initialize().then(()=>{
    
console.log("the db is initialized")
app.listen(Envconfig.PORT!,()=>{
    console.log(`the server is running ON ${Envconfig.PORT!}` )
})

})
.catch((err)=>{
console.log("the error is ",err)
})