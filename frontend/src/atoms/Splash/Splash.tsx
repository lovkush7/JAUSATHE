import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Link, useNavigate } from '@tanstack/react-router'

const Splash = () => {
  const [pogress, setpogress] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    let value = 0

    const interval = setInterval(() => {
      value += 2
      setpogress(value)

      if (value >= 100) {
        clearInterval(interval)

        // navigate after reaching 100%
        setTimeout(() => {
          navigate({ to: '/boarding/page1' })
        }, 300)
      }
    }, 100) // speed control

    return () => clearInterval(interval)
  }, [])
  return (
    <div className='min-h-screen flex flex-col  items-center  justify-center  bg-gray-900'>
      <div className='w-full flex flex-col gap-1.6 items-center justify-center'>
        <div className='h-25 w-25 rounded-full'>
          <img className='h-25 w-25 rounded-4xl' src="./download.png" alt="" />
        </div>
        <div className='mt-2'>
          <p><span className='text-3xl text-white font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
        </div>

        <Progress value={pogress} className="w-[50%] mt-20 [&>div]:bg-blue-500 " />

      </div>


    </div>
  )
}

export default Splash
