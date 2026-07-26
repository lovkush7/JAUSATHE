import React, { useEffect } from 'react'
import { api } from '../../api/Api'
import { useQuery } from '@tanstack/react-query'
import useScoket from '../../zustand/socket.config'
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

const gethistory = async (
    userId: string
) => {
    const res = await api.get("ride/getuserride",
        {
            params: {
                userId
            }
        }
    )
    return res.data
}

const Userhistory = () => {
    const { authUser,checkauth } = useScoket()

           useEffect(()=>{checkauth()},[])
    const { data } = useQuery({
        queryKey: ["ridedata"],
        queryFn: () => gethistory(authUser?.id!),

        // refetchInterval: 10000
    })
    console.log("the dataare ", data)
    console.log("the auth user",authUser)

    return (
       <div className="w-full min-h-screen bg-[#0B1120] p-8">
  <div className="mx-auto max-w-7xl rounded-2xl border border-slate-700 bg-[#161628] shadow-xl">

    <div className="border-b border-slate-700 p-6">
      <h1 className="text-3xl font-bold text-white">Ride History</h1>
      <p className="mt-1 text-sm text-slate-400">
        View all your completed and previous rides.
      </p>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-[#1C1C2D]">
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-300">Ride </TableHead>
            <TableHead className="text-slate-300">Pickup</TableHead>
            <TableHead className="text-slate-300">Destination</TableHead>
            <TableHead className="text-slate-300">Fare</TableHead>
            <TableHead className="text-slate-300">Distance</TableHead>
            <TableHead className="text-slate-300">Driver</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-right text-slate-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) &&
            data.map((ride) => (
              <TableRow
                key={ride.id}
                className="border-slate-700 transition hover:bg-[#202035]"
              >
                <TableCell className="font-medium text-white">
                  {ride.reqVehicleType}
                </TableCell>

                <TableCell className="text-slate-300">
                  {ride.pickupAddress}
                </TableCell>

                <TableCell className="text-slate-300">
                  {ride.DropoffAddress}
                </TableCell>

                <TableCell className="font-semibold text-green-400">
                  Rs. {ride.estimatedFare}
                </TableCell>

                <TableCell className="text-slate-300">
                  {ride.estimatedDistance} km
                </TableCell>

                <TableCell className="text-slate-300">
                  {ride.driver?.user?.FullName}
                </TableCell>

                <TableCell>
                  <span
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
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-300 hover:bg-slate-700"
                      >
                        <MoreHorizontalIcon size={18} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="border-slate-700 bg-[#1C1C2D] text-white"
                    >
                      <DropdownMenuItem>
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                      Rebook
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

export default Userhistory

