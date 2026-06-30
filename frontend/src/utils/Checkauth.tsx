import { api } from "@/api/Api"
import useScoket from "../zustand/socket.config"

    export const checkauth =async()=>{

    const {connectsocket}=useScoket.getState()
    const res = await api.get("/auth/checkauth")
    console.log("res of data"+ res.data)
    connectsocket()
    return res.data
    }