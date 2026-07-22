import { create } from "zustand"

interface RideData{
    rides: string
}
interface RideStore {
    rides: RideData | null,

    setrides: (data:RideData)=>void;
}

const useride = create<RideStore>((set)=>({
    rides: null,

    setrides: async(data:RideData)=>{
         try{
          set({rides:data})
         }catch(err){
            console.log(err)
         }
    } 
}))
export default useride;