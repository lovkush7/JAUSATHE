import { create } from "zustand"
import io, { type Socket } from "socket.io-client"
import { api } from "../api/Api";

interface Authuser{
id: string,
name?: string,
email?: string,
role?: string
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

    checkauth: () => Promise<void>;
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
         get().connectsocket()
         console.log(res.data)
        }catch(err){
            console.log(err)
        }
      },

    connectsocket:()=>{
        try{
            const {authUser} = get()
          if(!authUser || get().Socket?.connected) return;

          const socket = io("http://localhost:8000",{
            query:{
                userId: authUser.id
            }
          })
          socket.connect()
          set({Socket:socket})

          socket.on("online-users",(userId: string[])=>{
            set({onlineUsers: userId})

          })
        }catch(err){
            console.log("errrori s",err)
        }
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
        if(!Socket) return;

        Socket.on("new-ride",(ride: rideData)=>{
            set({newRide: ride})
            alert(`New ride request received: ${ride.rideId}`)

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