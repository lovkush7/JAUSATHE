import React, { useEffect, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { api } from '../../../api/Api'
import { id } from 'zod/v4/locales'
import { getTimeAgo } from '../../../utils/Date'

const GetRideData = async()=>{
    const res = await api.get("admin/ridedata")
    return res.data
}

const RideTable = () => {
  
    const {data} = useQuery({
        queryKey: ['Rides'],
        queryFn: ()=> GetRideData()
    })

    return (
       <div className="w-full min-h-screen text-black  p-8">
  <div className="mx-auto max-w-7xl rounded-2xl border border-slate-700  shadow-xl">

    <div className="border-b border-slate-700 p-6">
      <h1 className="text-3xl font-bold text-white">Ride Dashboard</h1>
      <p className="mt-1 text-sm ">
        View all your completed and previous rides.
      </p>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 ">
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-black">User </TableHead>
            <TableHead className="text-black">Driver</TableHead>
            <TableHead className="text-black">Route</TableHead>
            <TableHead className="text-black">Fare</TableHead>
            <TableHead className="text-black">Payment</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-black">Time</TableHead>
           
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) &&
            data.map((ride) => (
              <TableRow
                key={ride.id}
                className="border-slate-700 transition hover:bg-gray-400"
              >
                <TableCell className="font-medium ">
                  {ride?.rider_FullName}
                </TableCell>
                 
                <TableCell className="">
                  {ride?.driverUser_FullName}
                </TableCell>

                <TableCell className="text-sm flex gap-0.5">
                <p className='flex text-sm'> <span>{ride?.ride_pickupAddress}</span>  <span><ArrowRight/></span> <span>{ride?.ride_DropoffAddress}</span></p>
                </TableCell>

                <TableCell className="font-semibold ">
                  Rs. {ride?.ride_estimatedFare}
                </TableCell>

                <TableCell className="">
                  {ride?.payment_PaymentType} 
                  
                </TableCell>

                <TableCell className={`${ride?.ride_ridestauts === "COMPLETED" ? "text-green-600 font-bold" : "text-red-600"}`}>
                  {ride?.ride_ridestauts}
                </TableCell>

                <TableCell>
                  <span>
                    {/* {ride?.ride_CreatedAt} */}
                    {getTimeAgo(ride?.ride_CreatedAt)}
                  </span>
                
                </TableCell>

               
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  </div>
</div>
    )
}

export default RideTable;

