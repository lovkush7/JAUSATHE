import { useLocation, useNavigate } from '@tanstack/react-router'
import React from 'react'


const DriverNavbar = () => {
  const location = useLocation()
  const menu = location.pathname;
  const navigate = useNavigate()
  return ( 
    <div className='flex pl-3 pr-3 pt-1.5 border-b-2 border-gray-400 w-full bg-[#0D0D18] p-2 justify-between'>
      <div>
          <p><span className='text-3xl text-white  font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
      </div>
      <div>
        <ul className='flex gap-4 text-gray-400 text-sm font-semibold items-center justify-center cursor-pointer'>
            <li 
            className={ menu === "/DriverDashboard" ? "text-[#1E18AA] border-b-2 border-[#1E18AA]" : ""}
            onClick={()=>navigate({to: "/DriverDashboard"})}
              >
              Dashboard
              </li>
            <li className={ menu === "/Driver/trips" ? " text-[#1E18AA] border-b-2 border-[#1E18AA]" : ""}
             onClick={()=>navigate({to: "/Driver/trips"})}> 
             My trips
              </li>
            <li className={ menu === "/Driver/Earnings" ? " text-[#1E18AA] border-b-2 border-[#1E18AA]" : ""}
             onClick={()=>navigate({to: "/Driver/Earnings"})}>
               Earnings </li>
            {/* <li className={ menu === "/Book/Payment" ? " text-[#1E18AA] border-b-2 border-[#1E18AA]" : ""}
             onClick={()=>navigate({to: "/Book/Payment"})}>
              mapView
              </li> */}
            <li className={ menu === "/Driver/profile" ? " text-[#1E18AA] border-b-2 border-[#1E18AA]" : ""}
             onClick={()=>navigate({to: "/Driver/profile"})}>
              Profile</li>
        </ul>
      </div>
    </div>
  )
}

export default DriverNavbar
