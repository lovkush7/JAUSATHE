import { BluetoothSearchingIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Spinner } from '../../../components/ui/spinner'
import useride from '../../../zustand/userride'
import { api } from '../../../api/Api'
import { useQuery } from '@tanstack/react-query'

const ride = async(rideId: string)=>{
    const req = await api.get("ride/getstatus",{
        params:{
            rideId
        }
    })
}

const Searching = () => {
    const {rides} = useride()

    
    const [blur, setblur] = useState(true)
    const query = useQuery({
        queryKey:["rides"],
        queryFn:()=>ride()
    })
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

               

            {blur &&
                <>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                    <div className="flex items-center justify-center h-full  z-10 w-[500px] rounded-xl bg-[#08080F] p-6 shadow-2xl border border-gray-700">
                        <div className='flex flex-col  justify-center items-center '>
                            
                            <Spinner className="size-15 text-white" />
                            <span className='font-bold text-white'>Finding your ride.....</span>
                            <p className='text-gray-600 flex flex-col items-center'>Please wait while we process your request. <span>Do not refresh the page.</span> </p>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default Searching
