import "reflect-metadata"
import AppDataSource from "./config/database.config.ts"
import express from "express"
import Envconfig from "./config/Envconfig.ts"
import cors from "cors"
import cookieParser from "cookie-parser"
import { RegisterRoutes } from "./routes/routes.ts"
import { app, server } from "./config/socket.config.ts"
import { connectRedis } from "./config/Redis.config.ts"


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
AppDataSource.initialize()
// .then(async()=>
//   await connectRedis())
.then(()=>{
    
console.log("the db is initialized")
RegisterRoutes(app);
    app.use((err: any, req: any, res: any, next: any) => {
  console.log(err)

  return res.status(err.status || 500).json({
    message: err.message,
    fields: err.fields,
  })
})
server.listen(Envconfig.PORT!,()=>{
    console.log(`the server is running ON ${Envconfig.PORT!}` )
})

})
.catch((err)=>{
console.log("the error is ",err)
})