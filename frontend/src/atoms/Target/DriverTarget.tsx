import { Target } from 'lucide-react'
import React from 'react'
import {
  Progress,

} from "@/components/ui/progress"
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/Api'
import useScoket from '../../zustand/socket.config'

const completedRides =10
const targetRides = 20
const progress = 40

// const progress =
//   (data.completedRides / data.targetRides) * 100;

const TargetRides =async(DriverId: string)=>{
    const req = await api.get(`TargetRides${DriverId}/create`)
    return req.data;
}

const DriverTarget = () => {

    const {ProfileDetails} = useScoket()
    const query = useQuery({
        queryKey: [],
        queryFn: ()=> targetRides(ProfileDetails?.Driver?.id)
    })
  return (
    <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-2 mt-2 mb-2'>
        <div className='flex justify-between items-center p-2'>
            <div className=' flex gap-2 items-center'>
             <Target size={20} className='text-blue-700'/>
             <div className='flex flex-col '>
                  <h2 className='text-white font-bold'>Today's Target</h2>
                  <span className='text-gray-500 text-sm'>Complete ride Today</span>
             </div>
            </div>
                <div className='flex items-center'>
                <span className='p-2 bg-gray-500 rounded-2xl text-sm text-purple-700'>In progress </span>
             </div>
        </div>
        <div className="mt-6 flex items-end justify-between">
    <div>
      <span className="text-4xl font-bold">
        {completedRides}
      </span>

      <span className="text-xl text-muted-foreground">
        {" "}/ {targetRides}
      </span>
    </div>

    <span className="font-semibold text-purple-600">
      {Math.round(progress)}%
    </span>
  </div>

  <div className="mt-3">
    <Progress value={progress} className=" [&>div]:bg-blue-500 " />
  </div>

  <p className="mt-3 text-sm text-muted-foreground">
    {targetRides - completedRides} rides remaining
  </p>

</div>


      
    
  )
}

export default DriverTarget
