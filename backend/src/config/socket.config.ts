import { Server } from "socket.io"
import http from "http"
import express, { type Express } from "express"
import DriverService from "../services/Driver/DriverService.ts"
import { Driverstatus, UserRole } from "../enum/enum.details.ts"

const app: Express = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
export function getReciverSocketId(userId: string) {
    return onlinePassengers[userId]?.socketId || onlineDrivers[userId]?.socketId;
}
export function notifyNoDriverFound(rideId: string, userid: string) {

    const socketId = onlinePassengers[userid]?.socketId
    if (socketId) {
        io.to(socketId).emit("notfound-driver",
            { message: `no driver found for rideId: ${rideId}` });
    }
}
export function notifyDriversnewRides(
    driverIds: string[],
    rideData: any) {
    driverIds.forEach(driverIds => {
        const socketId = onlineDrivers[driverIds]?.socketId;
        if (socketId) {
            io.to(socketId).emit("new-ride", rideData);
        }else{
            console.log("driver not found")
        }
    })

}
interface onlineUsers {
    socketId: string;
    role: "PASSENGERS" | "DRIVER";
}
const onlinePassengers: Record<string, onlineUsers> = {} //userid:socketid
const onlineDrivers: Record<string, onlineUsers> = {} //userid:socketid

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId as string
    const role = socket.handshake.query.role as string

    console.log("userId", userId, "role", role)

    if (role === "PASSENGERS") {
        onlinePassengers[userId] = {
            socketId: socket.id,
            role: role
        }
    } else if (role === "DRIVER") {
        onlineDrivers[userId] = {
            socketId: socket.id,
            role: role
        }
    }

    io.emit("online-users", { passengers: Object.keys(onlinePassengers), drivers: Object.keys(onlineDrivers) })

    socket.on("updateLocation", async (data: any) => {
        console.log("the current location", data.lat)
        console.log(data)
        await DriverService.updateDriverLocation(
            userId,
            data.lat,
            data.lng,
            data.bearing
        )
    })

    socket.on("driveronline", async () => {
        console.log("driver active success")
        await DriverService.updateDriverStatus(
            userId,
            Driverstatus.ONLINE
        )
    })

    // socket.on("driveroffline",async ()=>{
    //  await DriverService.updateDriverStatus(
    //     userId,
    //     Driverstatus.OFFLINE
    //  )
    // })

   socket.on("disconnect", async () => {
    console.log("a user disconnected", socket.id);

    try {
        if (role === UserRole.DRIVER) {
            await DriverService.updateDriverStatus(
                userId,
                Driverstatus.OFFLINE
            );
        }
    } catch (err) {
        console.error("Failed to update driver status:", err);
    } finally {
        if (role === UserRole.PASSENGERS) {
            delete onlinePassengers[userId];
        }

        if (role === UserRole.DRIVER) {
            delete onlineDrivers[userId];
        }

        io.emit("online-users", {
            passengers: Object.keys(onlinePassengers),
            drivers: Object.keys(onlineDrivers),
        });
    }
});
})
export { io, server, app }