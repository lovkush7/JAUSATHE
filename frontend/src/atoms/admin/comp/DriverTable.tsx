import React, { useEffect, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontalIcon } from "lucide-react"
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

const DriverTabledata = async () => {
    const res = await api.get("admin/getdrivers")
    return res.data
}
const DriverApproval = async (DriverId: string, isApproval:boolean)=>{
  const response = await api.put(`admin/driverapproval/${DriverId}`,{isApproval})
  return response.data;


}
const DriverTable = () => {
  const [value, setValue] = useState()         
    const { data } = useQuery({
        queryKey: ["ridedata"],
        queryFn: () => DriverTabledata(),

        // refetchInterval: 10000
    })
    console.log("the dataare ", data)

    const queryClient = useQueryClient()

    const approvalmutation = useMutation({
      mutationFn: ({DriverId, isApproved}:{DriverId:string, isApproved:boolean})=>DriverApproval(DriverId,isApproved),
      onSuccess: ()=>{
        queryClient.invalidateQueries({
          queryKey:["driver"]
        })
      },
      onError:(err)=>{
        console.log(err)
      }
    })
  

    return (
       <div className="w-full min-h-screen text-black  p-8">
  <div className="mx-auto max-w-7xl rounded-2xl border border-slate-700  shadow-xl">

    <div className="border-b border-slate-700 p-6">
      <h1 className="text-3xl font-bold text-white">Driver Dashboard</h1>
      <p className="mt-1 text-sm ">
        View all your completed and previous rides.
      </p>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 ">
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-black">NAME </TableHead>
            <TableHead className="text-black">RIDES</TableHead>
            <TableHead className="text-black">TODAY</TableHead>
            <TableHead className="text-black">EARNINGS</TableHead>
            <TableHead className="text-black">STATUS</TableHead>
            <TableHead className="text-black">VEHICLES</TableHead>
            <TableHead className="text-black">IsApproved</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
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
                  {ride?.name}
                </TableCell>

                <TableCell className="">
                  {ride?.totalEarning}
                </TableCell>

                <TableCell className="">
                  {ride?.ridetoday}
                </TableCell>

                <TableCell className="font-semibold ">
                  Rs. {ride?.earning}
                </TableCell>

                <TableCell className="">
                  {/* {ride?.status}  */}
                  <p  className={`${ride?.status === "ONLINE" ? "text-green-600" : "text-red-600"}`}>{ride?.status} </p>
                </TableCell>

                <TableCell className="">
                  {ride?.vehicles?.type}
                </TableCell>

                <TableCell>
                  <span>
                    {ride?.approve}
                  </span>
                  {/* <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        ride.ridestauts === "COMPLETED"
                          ? "bg-green-500/20 text-green-400"
                          : ride.ridestauts === "CANCELLED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {ride.ridestauts}
                  </span> */}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black hover:bg-slate-700"
                      >
                        <MoreHorizontalIcon size={18} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="border-slate-700 bg-[#1C1C2D] text-white"
                    >
                      <DropdownMenuItem onClick={()=>{
                        approvalmutation.mutate({
                          DriverId: ride?.id,
                          isApproved: !ride?.approve
                        })
                        console.log( "driverid and rideapprove",ride?.id, ride?.approve)
                      }}>
                      { ride?.approve === "true" ? "disApprove" : "Approve"}
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                   
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="text-red-400">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

export default DriverTable

