import { create } from "zustand"

type locationType ={
    lat: number
    lng: number
}
 type locationstore ={
    locations: locationType | null
    destination: locationType | null

    currentLocation: (data: locationType)=>void
    currentdestination: (data: locationType)=>void

 }

const uselocation = create<locationstore>((set:any)=>({
    locations:  null,
    destination: null,


    currentLocation: (data)=>{
      try{
          set({locations: data})
          console.log(data)
      }catch(err){
        console.log(err)
      
      }
    },
    currentdestination: (data)=>{
        try{
            set({destination: data})
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
}))

export default uselocation;