import { create } from "zustand";
interface AdminActivity {
  type:
    | "RIDE_CREATED"
    | "RIDE_ACCEPTED"
    | "DRIVER_ONLINE"
    | "DRIVER_OFFLINE"
    | "PAYMENT_SUCCESS"
    | "RIDE_STARTED"
    | "RIDE_COMPLETED"
    | "RIDE_CANCELLED";

  title: string;
  message: string;

  rideId?: string;
  driverId?: string;
  riderId?: string;
  amount?: number;

  timestamp: string;
}

interface AddAdminActivity{
    activites: AdminActivity[],
    addactivity: (activites: AdminActivity)=>void;
    clearactivity: ()=>void;
}
export const getnotification = create<AddAdminActivity>((set)=>
    ({
        activites: [],

        addactivity:(activites)=>{
          set((state)=>({
            activites: [
               activites,
               ...state.activites
            ].slice(0,50)
          }))
        },
        clearactivity:()=>{
            set({
                activites:[]
            })
        },

}))
