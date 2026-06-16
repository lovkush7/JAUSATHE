import React, { useState } from 'react'
import Map from '../map/Map'
import { Button } from '../../components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../../api/Api'
import uselocation from '../../zustand/location'

const vechicles = [
  {
    type: "car",
    icons: "🚗",
    spec: "confortable 1-4 persons"
  },
  {
    type: "BIKE",
    icons: "🏍️",
    spec: "fastest for 1 persons",
  },
  {
    type: "taxi",
    icons: "🚕",
    spec: "suitable for 4 persons"
  },

]
const payment = [
  {
    name: "card",
    icons: "💳"
  },
  {
    name: "cash",
    icons: "💵"
  }, {
    name: "esewa",
    icons: "📱"
  },
  {
    name: "khalti",
    icons: "🟣"
  }
]
type LocationType = {
  lat: number
  lng: number
}
const conformride = async(
  pickupAddress: string,
  pickuplng: number,
  pickuplat: number,
  DropoffAddress: string,
  dropofflat: Number,
  dropofflng: number,
  vehicleType: string,
)=>{
  const res = await api.post("rides/conformride",{
    pickupAddress,
    pickuplat,
    pickuplng,
    DropoffAddress,
    dropofflat,
    dropofflng,
    vehicleType
  })
  return res.data;

}
const location = async (
  mylocation: LocationType
) => {

  const res = await api.get("/geocoading/reversecode", {
    params: {
      lat: mylocation.lat,
      lng: mylocation.lng
    }
  })
  return res.data;
}
const destination = async (
  mydestination: LocationType
) => {
  const res = await api.get("/geocoading/reversecode", {
    params: {
      lat: mydestination.lat,
      lng: mydestination.lng
    }
  })
  return res.data;
}

const sendLocations = async (
  pickuplat: number | null,
  pickuplng: number | null,
  dropofflat: number | null,
  dropofflng: number | null,
  vehicleType: string | null
) => {
  const res = await api.get("/ride/estimatefare", {
    params: {
      pickuplat,
      pickuplng,
      dropofflat,
      dropofflng,
      vehicleType
    }
  })
  return res.data;

}

const ConformRides = () => {
  const [Locations, setLocations] = useState<LocationType | null>(null)
  const [Destination, setDestination] = useState<LocationType | null>(null)
  const [isActive, SetIsActive] = useState(null)
  const [vehicleType, setVechiclestype] = useState(null);
  const [pickuplat, setPickuplat] = useState<number | null>(null)
  const [pickuplng, setPickuplng] = useState<number | null>(null)
  const [dropofflat, setDropofflat] = useState<number | null>(null)
  const [dropofflng, setDropofflng] = useState<number | null>(null)
  const [Next, setNext] = useState(1);
  const [Time, setTime] = useState<string | null>(null)
  const [Distanceinkm, setDistanceinkm] = useState<string | null>(null)
  const [fare, setFare] = useState<string | null>(null)

  const { locations: mylocation, destination: mydestination } = uselocation()

  console.log("the vehicles is ", vehicleType)
  console.log("the Locations", Locations)
  console.log("Destination", Destination)

  const { data: mydta } = useQuery({
    queryKey: [mylocation],
    queryFn: () => location(mylocation!),
    enabled: !!mylocation
  })
  const { data: des } = useQuery({
    queryKey: [mydestination],
    queryFn: () => destination(mydestination!),
    enabled: !!mydestination
  })

  const { data } = useQuery({
    queryKey: ["locations", pickuplat, pickuplng, dropofflat, dropofflng, vehicleType],
    queryFn: () => sendLocations(pickuplat, pickuplng, dropofflat, dropofflng, vehicleType),


    enabled:
      pickuplat !== null &&
      pickuplng !== null &&
      dropofflat !== null &&
      dropofflng !== null &&
      vehicleType !== null,

  })
 const mutation = useMutation({
  mutationFn: (rideData: {
    pickupAddress: string
    pickuplat: number
    pickuplng: number
    dropoffAddress: string
    dropofflat: number
    dropofflng: number
    vehicleType: string
  }) =>
    conformride(
      rideData.pickupAddress,
      rideData.pickuplng,
      rideData.pickuplat,
      rideData.dropoffAddress,
      rideData.dropofflat,
      rideData.dropofflng,
      rideData.vehicleType
    ),
})
//hello world
console.log("hellow")
console.log("hwllowworld")
  const handlesubmit = () => {
    setPickuplat(Locations?.lat ?? null)
    setPickuplng(Locations?.lng ?? null)
    setDropofflat(mydestination?.lat ?? null)
    setDropofflng(mydestination?.lng ?? null)
  }
  return (
    <div className="w-full h-screen flex  justify-center bg-[#08080F] text-white overflow-auto ">
      <div className='flex-1 mt-5 rounded-2xl '>
        <Map
          setLocations={setLocations}
          Locations={Locations}
          setDestination={setDestination}
          Destination={Destination}
          setTime={setTime}
          setDistanceinkm={setDistanceinkm}
          setFare={setFare}
        />
      </div>
      {
        Next === 1 && (
          <div className='flex-1 flex-col  m-5'>
            <div className='bg-[#161628] p-4 rounded-lg border-2 border-[#3B3B4F]'>
              <p>your Rides</p>
              <div className='w-full flex flex-col gap-2 mt-4'>
                <p className='text-sm text-gray-400 uppercase'>pickup</p>
                <div className='flex gap-2 items-center '>
                  <div className='bg-green-600 rounded-full w-2 h-2'></div>
                  <span className=' flex-1 bg-[#222233] p-3  rounded-lg border border-gray-700 '>{mydta}</span>
                </div>


              </div>
              <div className='w-full flex flex-col gap-2 mt-4'>
                <p className='text-sm text-gray-400 uppercase'>Destination</p>
                <div className='flex gap-2 items-center '>
                  <div className='bg-purple-700 rounded-full w-2 h-2'></div>
                  <span className=' flex-1 bg-[#222233] p-3  rounded-lg border  border-gray-700'>{des}</span>
                </div>


              </div>
            </div>
            <div className='mt-4 bg-[#161628] p-4 rounded-lg border-2 border-[#3B3B4F]'>
              {Array.isArray(vechicles) && vechicles.map((v, index: any) => (
                <div
                  onClick={(e: any) => {
                    e.preventDefault()
                    setVechiclestype(v.type as any)
                    SetIsActive(index)
                  }}
                  className={`w-full p-4 border rounded-lg mt-2 transition-all duration-200
              ${isActive === index
                      ? "bg-[#1C1B3B] text-[#4F46E5] border-[#4F46E5]"
                      : "bg-[#222233] border-gray-700"
                    }`
                  }
                >
                  <div className='flex justify-between items-center '>
                    <div className='flex gap-2 items-center '>
                      {v.icons}
                      <p className='flex flex-col gap-0.3'>
                        {v.type}
                        <span className='text-sm text-gray-500'>{v.spec}</span> </p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-bold'>NRP :{fare}</p>
                      <p className='text-sm text-gray-600'>{Time} MIN</p>

                    </div>

                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => {
              handlesubmit()
              setNext(2)
            }
            } className='w-full p-5 rounded-2xl bg-blue-800 mt-4 '>
              Continue - fare estimation
            </Button>

          </div>
        )
      }
      {Next === 2 && (
        <div className='flex-1 flex-col m-5'>
          <div className='bg-[#161628] p-4 rounded-lg border-2 border-[#3B3B4F]'>
            <p className='font-medium text-white'>Fare breakdown</p>
            <div className='mt-2 text-sm  flex flex-col gap-2 justify-between'>
              <div className='flex justify-between'>
                <p className='text-gray-500'>Estimated Fare</p>
                <p>NRP {data?.estimatedFare}</p>
              </div>
              <hr className='w-full mt-2 border-gray-500' />
            </div>
            <div className='mt-2 text-sm  flex flex-col gap-2 justify-between'>
              <div className='flex justify-between'>
                <p className='text-gray-500'>EstimatedDistanceKm</p>
                <p> {data?.estimatedDistanceKm} KM</p>
              </div>
              <hr className='w-full mt-2 border-gray-500' />
            </div>
            <div className='mt-2 text-sm  flex flex-col gap-2 justify-between'>
              <div className='flex justify-between'>
                <p className='text-gray-500'>EstimatedDurationMinutes</p>
                <p> {data?.estimatedDurationMinutes} MIN</p>
              </div>
              <hr className='w-full mt-2 border-gray-500' />
            </div>


          </div>
          <div className='bg-[#161628] p-4 rounded-lg border-2 mt-4 border-[#3B3B4F]'>
            <p>Payment Method</p>

            {Array.isArray(payment) &&
              payment.map((dta,index:any) => (
                <div
                onClick={()=>SetIsActive(index)}
                  key={dta.name}
                  className={`flex flex-row items-center gap-3 rounded-xl p-3 mt-2
                    ${isActive === index
                      ? "bg-[#1C1B3B] text-[#4F46E5] border-[#4F46E5]"
                      : "bg-[#222233] border-gray-700"
                    }`}
                >
                  <p>{dta.icons}</p>
                  <p>{dta.name}</p>
                </div>
              ))}
          </div>
          <Button 
              onClick={() => {
   mutation.mutate({
  pickupAddress: mydta,
  pickuplat: pickuplat!,
  pickuplng: pickuplng!,
  dropoffAddress: des,
  dropofflat: dropofflat!,
  dropofflng: dropofflng!,
  vehicleType: vehicleType!,
})
  }}
          className='w-full p-5 rounded-2xl bg-blue-800 mt-4 '>
            Book Ride
          </Button>
        </div>
      )}

    </div>
  )
}

export default ConformRides
