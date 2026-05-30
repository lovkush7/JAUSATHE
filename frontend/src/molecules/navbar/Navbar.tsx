import React from 'react'

const Navbar = () => {
  return ( 
    <div className='flex pl-3 pr-3 pt-1.5 border-b-2 border-gray-400 w-full bg-[#0D0D18] p-2 justify-between'>
      <div>
          <p><span className='text-3xl text-white  font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
      </div>
      <div>
        <ul className='flex gap-4 text-gray-400 text-sm font-semibold items-center justify-center'>
            <li>Dashboard</li>
            <li>Book Rides</li>
            <li>My Rides</li>
            <li>Payment</li>
            <li>Profile</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
