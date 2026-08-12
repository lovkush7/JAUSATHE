import React, { useEffect } from 'react'
import useScoket from '../../zustand/socket.config'
import { api } from '../../api/Api'
import { useQuery } from '@tanstack/react-query'
const getprofile = async (userId: string) => {
    const res = await api.get(`users/getprofile/${userId}`)
    return res.data
}
const Profiles = () => {
    const { authUser, checkauth } = useScoket()
  
         const { data: profile } = useQuery({
        queryKey: [authUser?.id],
        queryFn: () => getprofile(authUser!.id),
        enabled: !!authUser?.id
    })
    console.log("the profile is ", profile)
  return (
    <div className='w-full h-full p-2'>
    <div className='bg-gradient-to-r from-violet-600 to-indigo-600  rounded-lg border-2 border-[#3B3B4F] p-4' >
           <div className='flex flex-col items-center justify-center'>
               <div className='bg-blue-300 w-20 h-20 border-2 border-blue-300 rounded-xl items-center justify-center'>
                  {/* <p className='items-center justify-center text-3xl'>👨‍💼</p> */}
               </div>
                   <div>
                    <span className='font-bold text-white text-[20px]'>{profile?.FullName}</span>
                   </div>
                   <div>
                    <span className='text-white text-sm'>{profile?.Phone}</span>
                   </div>
                   <div className='flex gap-2.5 text-white text-[10px]'>
                       <p>⭐4.92</p>
                       <p>142 Rides</p>
                   </div>
           </div>
      </div>
    </div>
  )
}

export default Profiles
