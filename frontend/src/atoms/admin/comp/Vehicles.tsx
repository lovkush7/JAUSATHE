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

const getvehicles = async () => {
    const req = await api.get("vehicles/getVehicles")
    return req.data
}
const approval = async (
    driverid: string,
    isapproved: boolean
) => {
    const req = await api.patch(`vehicles/approve/${driverid}`, { isapproved })
    return req.data;
}


const Vehicles = () => {
    const { data } = useQuery({
        queryKey: ["vehiclesdata"],
        queryFn: () => getvehicles()
    })
    const queryclient = useQueryClient()

    const approvalmutation = useMutation({
        mutationFn: ({ driverid, isapproved }: { driverid: string, isapproved: boolean }) => approval(driverid, isapproved),
        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey: ["vehiclesdata"]
            })

        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <div className="w-full min-h-screen text-black  p-8">
            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-700  shadow-xl">

                <div className="border-b border-slate-700 p-6">
                    <h1 className="text-3xl font-bold text-white">Driver Dashboard</h1>
                    <p className="mt-1 text-sm ">

                    </p>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="sticky top-0 ">
                            <TableRow className="border-slate-700 hover:bg-transparent">
                                <TableHead className="text-black">NAME </TableHead>
                                <TableHead className="text-black">TYPE</TableHead>
                                <TableHead className="text-black">PLATENUMBERS</TableHead>
                                <TableHead className="text-black">MODEL</TableHead>
                                <TableHead className="text-black">SEATCAPACITY</TableHead>
                                <TableHead className="text-black">LICENSE-EXP</TableHead>
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
                                            {ride?.driver.user.FullName}
                                        </TableCell>

                                        <TableCell className="">
                                            {ride?.type}
                                        </TableCell>

                                        <TableCell className="">
                                            {ride?.plateNumber}
                                        </TableCell>

                                        <TableCell className="font-semibold ">
                                            {ride?.model}
                                        </TableCell>

                                        <TableCell className="">
                                            {ride?.seatCapacity}

                                        </TableCell>

                                        <TableCell className="">
                                            {ride?.driver.licenseExpery}
                                        </TableCell>

                                        <TableCell>
                                            <span>
                                                {ride?.isDefault ? "YES" : "NO"}
                                            </span>
            
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
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            const currentApproval = ride.isDefault;

                                                            approvalmutation.mutate({
                                                                driverid: ride.id,
                                                                isapproved: !currentApproval,
                                                            });

                                                            console.log(
                                                                "driverid:",
                                                                ride.id,
                                                                "current approval:",
                                                                ride.isDefault,
                                                                "new approval:",
                                                                !currentApproval
                                                            );
                                                        }}
                                                    >
                                                        {ride.isDefault ? "Disapprove" : "Approve"}
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

export default Vehicles
