import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowBigLeft, MoveRight } from 'lucide-react'
import React from 'react'

const Onboarding2 = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gray-900 '>
      <div className='flex justify-end  text-white cursor-pointer'>
        <span onClick={()=>navigate({to:'/auth/login'})} className='m-6 flex gap-2'>skip<MoveRight /> </span>
      </div>
      <div className='flex flex-1  flex-col items-center justify-center '>
        <div className='h-56 w-56 rounded-2xl ' >
          <img className='w-full h-full rounded-3xl' src="../track.png" alt="" />
        </div>
        <div className='flex flex-col gap-2 items-center justify-baseline mt-19'>
          <h2 className='text-white font-bold text-3xl'>Live Driver Traking</h2>
          <p className='text-gray-300'>Watch your driver arrive in real-time. Never wonder where your ride is again.</p>
        </div>
        <div>
          <Button onClick={()=>navigate({ to: '/boarding/page3' })}  className='mt-6 w-2xl p-8 bg-blue-400 flex gap-2 hover:bg-blue-300 cursor-pointer '>
            continue <MoveRight size={20}/>
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Onboarding2;
