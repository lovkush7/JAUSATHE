import { create } from "zustand"
import io from "socket.io-client"

const useScoket = create((set:any, get:any)=>({
    Socket: null,

    connectsocket:()=>{
        try{
          if(get().Socket?.connected) return;

          const socket = io("http://localhost:800",{
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
    }
}))
export default useScoket;