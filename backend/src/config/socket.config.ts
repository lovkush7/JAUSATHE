import { Server } from "socket.io"
import http from "http"
import express, {type Express} from "express"

const app:Express = express()

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173"
    }
});
export function getReciverSocketId(userId: string){
    return onlinePassengers[userId]?.socketId || onlineDrivers[userId]?.socketId;
}
export function notifyNoDriverFound(rideId: string, userid: string){

    const socketId =  onlinePassengers[userid]?.socketId
    if(socketId){
        io.to(socketId).emit("notfound-driver",
             { message: `no driver found for rideId: ${rideId}` });
    }
}
export function notifyDriversnewRides(  
    driverIds: string[],
    rideData: any){
        driverIds.forEach(driverIds=> {
            const socketId = onlineDrivers[driverIds]?.socketId;
            if(socketId){
                io.to(socketId).emit("new-ride", rideData);
            }
        })

}
interface onlineUsers {
    socketId: string;
    role: "PASSENGERS" | "DRIVER";
}
const onlinePassengers: Record<string, onlineUsers> = {} //userid:socketid
const onlineDrivers: Record<string, onlineUsers> = {} //userid:socketid

io.on("connection", (socket)=>{
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId as string
    const role = socket.handshake.query.role as "PASSENGERS" | "DRIVER"
 
    console.log("userId", userId, "role", role)

    if(role === "PASSENGERS"){
        onlinePassengers[userId] = {
            socketId: socket.id,
            role: role
        }
    } else if(role === "DRIVER"){
        onlineDrivers[userId] = {
            socketId: socket.id,
            role: role
        }
    }

    io.emit("online-users", { passengers: Object.keys(onlinePassengers), drivers: Object.keys(onlineDrivers) })


    socket.on("disconnect",()=>{
        console.log("a user disconnected", socket.id)
        if(onlinePassengers[userId]){
            delete onlinePassengers[userId];
        }
        if(onlineDrivers[userId]){
            delete onlineDrivers[userId];
        }

        io.emit("online-users", { passengers: Object.keys(onlinePassengers), drivers: Object.keys(onlineDrivers) })
    })

})
export {io, server,app}