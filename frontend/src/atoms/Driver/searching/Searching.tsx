import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";
import Drivermap from "../../map/Drivermap";
import CurrentRide from "../CurrentRide/CurrentRide";
import UserAcceptance from "../../map/UserAcceptancemap";
const payment = [
  {
    name: "CARD",
    icons: "💳"
  },
  {
    name: "CASH",
    icons: "💵"
  }, {
    name: "ESEWA",
    icons: "📱"
  },
  {
    name: "KHALTI",
    icons: "🟣"
  }
]
const ride = async (rideId: string) => {
  const req = await api.get("ride/getstatus", {
    params: {
      rideId,
    },
  });
  console.log("the the fetched res is  ", req.data)
  return req.data;
};


const Searching = () => {
  const [isActive, SetIsActive] = useState(null)
  const { newRide } = useScoket();
  const { ride: rides, clearRide } = useride()
  console.log("ride id ni xinna ", newRide)
  console.log("ride id ni xinna ", rides)
  const [completed, setCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navagation = useNavigate()
  const { data } = useQuery({
    queryKey: ["ride-status", rides?.id],
    queryFn: () => ride(rides?.id!),
    enabled: !!rides?.id,
    refetchInterval: 3000,
  });
   const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("Payment/CreatePayment", {
        rideId: rides?.id,
        PaymentType: paymentMethod,
        payment: rides?.estimatedFare
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("the data is ", data)
      setPaymentMethod("");
      
      setCompleted(true);
    },
    onError: (error) => {
      console.error("Error completing ride:", error);
    },
  }); 
   
  const status = data;
  useEffect(() => {
    if (!status) {
      const timer = setTimeout(() => {
        clearRide();
        navagation({ to: "/" })
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, clearRide]);
  console.log("teh stus", status)

  switch (status) {
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
            <UserAcceptance />
          </div>
          <div className="w-[370px] p-4">
            <CurrentRide />
          </div>
          <div>

          </div>

        </div>
      );
    case "COMPLETED":
      return (
        <>
          {completed ? (
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
          ) : (
            <div className="flex p-4  min-h-screen bg-[#05060D] text-white">
              <div className="flex-1 items-center justify-center ml-20 mr-20">
                 <div className="flex flex-col gap-2 mt-4 w-full  bg-[#161628] rounded-xl pb-6 pt-4 border border-gray-700 pl-1 pr-1">
                 <div className="flex justify-start text-sm text-gray-400  ">
                         <span>Total Amount</span>
                 </div>
                  <div className="flex flex-col justify-center items-center text-2xl font-bold text-white">
                    <span>NRP {rides?.estimatedFare}</span>
                     <span className="text-sm text-gray-500"> <span>{rides?.pickupAddress}</span> <span>---</span> <span>{rides?.DropoffAddress}</span></span>
                     <span className="text-sm text-gray-600">{rides?.estimatedDistance}km</span>
                  </div>
                </div>
                
                <div className='bg-[#161628] p-4 rounded-lg border-2 mt-4 border-[#3B3B4F]'>
                  <p>Payment Method</p>

                  {Array.isArray(payment) &&
                    payment.map((dta, index: any) => (
                      <div
                        onClick={() =>{
                           setPaymentMethod(dta.name)
                          SetIsActive(index)}}
                        key={dta.name}
                        className={`flex flex-row items-center gap-3 rounded-xl p-3 mt-2
                    ${isActive === index
                            ? "bg-[#1C1B3B] text-[#4F46E5] border-[#4F46E5]"
                            : "bg-[#222233] border-gray-700"
                          }`}
                      >
                        <p>{dta.icons}</p>
                        <p
                      
                        >{dta.name}</p>
                      </div>
                    ))}
                </div>
                <div>
                  <button 
                  
                  className="w-full p-4 bg-blue-600 mt-5 rounded-lg text-white" onClick={() =>{ 
                    mutation.mutate()
                    setCompleted((prev)=>!prev)}}>
                    pay{rides?.estimatedFare} 
                  </button>
                </div>
              </div>
              
            </div>
          )}
        </>
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