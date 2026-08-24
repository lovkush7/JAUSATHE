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

const GetUsersData = async()=>{
    const res = await api.get("admin/GetUsers")
    return res.data
}

const UserTable = () => {

    const {data} = useQuery({
        queryKey: ["userDetails"],
        queryFn: ()=>GetUsersData()
    })
    console.log("the user is ",data)

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
            <TableHead className="text-black">phone</TableHead>
            <TableHead className="text-black">Rides</TableHead>
            <TableHead className="text-black">spend</TableHead>
            <TableHead className="text-black">STATUS</TableHead>
            <TableHead className="text-black">Email</TableHead>
            {/* <TableHead className="text-black">IsApproved</TableHead> */}
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data?.user) &&
  data.user.map((user: any) => (
              <TableRow
                key={user.id}
                className="border-slate-700 transition hover:bg-gray-400"
              >
                <TableCell className="font-medium ">
                  {user?.FullName}
                </TableCell>

                <TableCell className="">
                  {user?.Phone}
                </TableCell>

                <TableCell className="">
                  {user?.total}
                </TableCell>

                <TableCell className="font-semibold ">
                  Rs. {user?.totalSpent}
                </TableCell>

                <TableCell className="">
                  {/* {ride?.status}  */}
                  <p  className={`${user?.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>{user?.status} </p>
                </TableCell>

                {/* <TableCell className="">
                  {ride?.vehicles?.type}
                </TableCell> */}

                <TableCell>
                  <span>
                    {user?.Email}
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
                      >
                    
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

export default UserTable

