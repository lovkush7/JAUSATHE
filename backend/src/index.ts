import "reflect-metadata"
import AppDataSource from "./config/database.config.ts"
import express from "express"
import Envconfig from "./config/Envconfig.ts"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
AppDataSource.initialize().then(()=>{
    
console.log("the db is initialized")
app.listen(Envconfig.PORT!,()=>{
    console.log(`the server is running ON ${Envconfig.PORT!}` )
})

})
.catch((err)=>{
console.log("the error is ",err)
})