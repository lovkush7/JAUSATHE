import { create } from "zustand"
import io from "socket.io-client"
import { api } from "../api/Api";

const useScoket = create((set:any, get:any)=>({
    Socket: null,
    authUser: null,


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
        }catch(err){
            console.log("errrori s",err)
        }
    },
    DisconnectSocket: ()=>{
        if(get().Socket?.connected)
        {
            get().Socket.disconnect();
        }
    },
     
}))
export default useScoket;