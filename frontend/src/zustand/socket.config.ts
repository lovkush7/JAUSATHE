import { create } from "zustand"
import io, { type Socket } from "socket.io-client"
import { api } from "../api/Api";
import uselocation from "./location";

interface Authuser{
id: string,
name?: string,
email?: string,
Role?: string
}
interface rideData{
    rideId: string,
    pickupAddress: string,
    DropoffAddress: string,
    estimatefare: number,
    vechicletype: string
}
interface SocketStore{
    Socket: Socket | null;
    authUser: Authuser | null;
    onlineUsers: string[];
    newRide: rideData | null;

    checkauth: () => Promise<Authuser | null>;
    connectsocket: () => void;
    DisconnectSocket: () => void;
    listenToRides: () => void;
    nonlistentorides: () => void;
    clearride: () => void;
}



const useScoket = create<SocketStore>((set, get)=>({
    Socket: null,
    authUser: null,
    onlineUsers: [],
    newRide: null,

     checkauth:async ()=>{
        try{
         const res =await api.get("/auth/checkauth")
         set({authUser: res.data})
         console.log("the auth user is ",res.data)
         get().connectsocket()
         return res.data
        }catch(err){
            console.log(err)
        }
      },

   connectsocket: () => {

    const { authUser, Socket } = get();

    if (!authUser)
        return;

    if (Socket?.connected)
        return;

    const socket = io("http://localhost:8000", {
        query: {
            userId: authUser.id,
            role: authUser.Role,
        },
    });

    socket.on("connect", () => {
        console.log("Connected", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });

    socket.on("connect_error", (err) => {
        console.log(err);
    });

    socket.on("online-users", (users) => {
        set({
            onlineUsers: users,
        });
    });

    set({
        Socket: socket,
    });
},
    DisconnectSocket: ()=>{
        const {Socket} = get()
        if(Socket?.connected)
        {
           Socket.disconnect();
        }
        set({
            Socket: null,
            onlineUsers: []
        })
    },
    listenToRides: ()=>{
        const {Socket} = get()
        const {setroutemode} = uselocation.getState()
        if(!Socket) return;

        Socket.on("new-ride",(ride: rideData)=>{
            
            set({newRide: ride})
            setroutemode("driver")
            
            console.log("the new ride is ", ride)
            // alert(`New ride request received: ${ride.rideId}`)

        })
        
    },
    nonlistentorides:()=>{
        const {Socket} = get()
        Socket?.off("new-ride")
    }
    ,
    clearride:()=>{
        set({newRide: null})
    }
     
}))
export default useScoket;