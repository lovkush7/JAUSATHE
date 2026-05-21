import { api } from "@/api/Api"

    export const checkauth =async()=>{
    const res = await api.get("/auth/checkauth")
    console.log("res of data"+ res.data)
    return res.data
    }