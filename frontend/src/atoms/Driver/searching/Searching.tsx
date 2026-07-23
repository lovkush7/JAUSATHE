import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { api } from "../../../api/Api";
import useScoket from "../../../zustand/socket.config";
import useride from "../../../zustand/userride";

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
  const {ride:rides} = useride()
  // console.log("ride id ni xinna ", newRide)
  // console.log("ride id ni xinna ",rides )


  const { data } = useQuery({
    queryKey: ["ride-status", rides?.id],
    queryFn: () => ride(rides?.id!),
    enabled: !!rides?.id,
    refetchInterval: 3000, 
  });
const status = data;
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
    return ( <div><p>Accepted</p></div> ) ;

  default:
    return null;
  }
 

};

export default Searching;  