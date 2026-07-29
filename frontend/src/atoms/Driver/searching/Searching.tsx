import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { api } from "../../../api/Api";
import useScoket from "../../../zustand/socket.config";
import useride from "../../../zustand/userride";
import Driverlocation from "../../map/Acceptedmap";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Smile } from "lucide-react";
import { useEffect } from "react";
import Drivermap from "../../map/Drivermap";
import CurrentRide from "../CurrentRide/CurrentRide";
import UserAcceptance from "../../map/UserAcceptancemap";

const ride = async (rideId: string) => {
  const req = await api.get("ride/getstatus", {
    params: {
      rideId,
    },
  });

  return req.data;
};


const Searching = () => {
  const { newRide } = useScoket();
  const {ride:rides, clearRide} = useride()
  // console.log("ride id ni xinna ", newRide)
  // console.log("ride id ni xinna ",rides )

const navagation = useNavigate()
  const { data } = useQuery({
    queryKey: ["ride-status", rides?.id],
    queryFn: () => ride(rides?.id!),
    enabled: !!rides?.id,
    refetchInterval: 3000, 
  });
const status = data;
  useEffect(() => {
    if (!status) {
      const timer = setTimeout(() => {
        clearRide();
           navagation({to:"/"})
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, clearRide]);
console.log("teh stus",status)

  switch(status){
      case "REQUESTED":
      case "SEARCHING":
      case "DRIVERNOTFOUND":
         return (
    <Dialog open={!!data}>
      <DialogContent
        className="bg-[#08080F] border-gray-700 text-white max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <Spinner className="size-14" />

          <h2 className="text-xl font-bold">
            Finding your ride...
          </h2>

          <p className="text-center text-gray-400">
            Please wait while we process your request.
            <br />
            Do not refresh the page.
          </p>

          <p className="text-green-400 font-semibold">
            {data}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
    case "ACCEPTED":
    return ( 
    <div className="flex ">
      <div className="flex-1">
          <UserAcceptance/>
      </div>
      <div className="w-[370px] p-4">
        <CurrentRide/>
      </div>
      <div>
        
      </div>
 
    </div>
     ) ;
     case "COMPLETED":
      return (
       <div className="flex min-h-screen items-center justify-center bg-[#05060D] px-4">
  <div className="w-full max-w-md rounded-3xl border border-purple-700/20 bg-[#11131F] p-8 text-center shadow-2xl">
    {/* Success Icon */}
    <div className="mx-auto flex h-24 w-24 items-center justify-center ">
      {/* <Smile className="h-16 w-16 text-blue-900" /> */}
       <p><span className='text-3xl text-white  font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
    </div>


    <h1 className="mt-6 text-3xl font-bold text-white">
      Ride Completed!
    </h1>

    {/* Description */}
    <p className="mt-3 text-gray-400">
      Your ride has been completed successfully.
      Thank you for riding with जाऔँsathe .
    </p>

    {/* Divider
    <div className="my-6 border-t border-gray-700" /> */}

    {/* Button */}
    <Button
      className="h-12 w-full rounded-xl mt-6 bg-blue-600 text-lg font-semibold hover:bg-blue-500"
      onClick={() => {
        navagation({ to: "/" });
        clearRide();
      }}
    >
      Done
    </Button>
  </div>
</div>
      );

  default:
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05060D] px-4">
  <div className="w-full max-w-md rounded-3xl border border-purple-700/20 bg-[#11131F] p-8 text-center shadow-2xl">
    {/* Success Icon */}
    <div className="mx-auto flex h-24 w-24 items-center justify-center ">
      {/* <Smile className="h-16 w-16 text-blue-900" /> */}
       <p><span className='text-3xl text-white  font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
    </div>

    {/* Title */}
    <h1 className="mt-6 text-3xl font-bold text-red-700">
      Please BOOK THE RIDE!!!
    </h1> 
  </div>
</div>
      );
  }
 

};

export default Searching;  