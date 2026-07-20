import { create } from "zustand"

type locationType ={
    lat: number
    lng: number
}
type Routemode = "driver" | "trip"
 type locationstore ={
    locations: locationType | null
    destination: locationType | null
    driverloc: locationType| null
    riderloc: locationType | null
    routemode: Routemode,
    passdestination: locationType | null

    currentLocation: (data: locationType)=>void
    currentdestination: (data: locationType)=>void
    passengerdestination: (data: locationType | null)=>void
    driverposition:(data: locationType| null) =>void
    riderpostion: (data: locationType | null) => void
    setroutemode: (route: Routemode) => void

 }

const uselocation = create<locationstore>((set)=>({
    locations:  null,
    destination: null,
    passdestination: null,
    driverloc: null,
    riderloc: null,
    routemode: "driver",


    currentLocation: (data)=>{
      try{
          set({locations: data})
          console.log("the locca",data)
      }catch(err){
        console.log(err)
      
      }
    },

    currentdestination: (data)=>{
        try{
            set({destination: data})
            console.log("the desssst",data)
        }catch(err){
            console.log(err)
        }
    },
 
     driverposition:(data)=>{
        try{
            set({driverloc: data})
        }catch(err){
            console.log(err)
        }
     },
     riderpostion:(data)=>{
      try{
        set({riderloc: data})
      }catch(err){

      }
     },
     setroutemode: (mode)=>{
        set({routemode: mode})
     },
     passengerdestination: (data)=>{
        set({passdestination: data})
     }

}))

export default uselocation;