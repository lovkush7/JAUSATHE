import React from 'react'

const Profiles = () => {
  return (
    <div className='w-full h-full p-2'>
    <div className='bg-gradient-to-r from-violet-600 to-indigo-600  rounded-lg border-2 border-[#3B3B4F] p-4' >
           <div className='flex flex-col items-center justify-center'>
               <div className='bg-blue-300 w-20 h-20 border-2 border-blue-300 rounded-xl items-center justify-center'>
                  {/* <p className='items-center justify-center text-3xl'>👨‍💼</p> */}
               </div>
                   <div>
                    <span className='font-bold text-white text-[20px]'>Lov karki</span>
                   </div>
                   <div>
                    <span className='text-white text-sm'>987654321</span>
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
