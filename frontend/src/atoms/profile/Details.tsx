import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../../components/ui/input'
import { Field, FieldLabel } from '../../components/ui/field'
import { Label } from '../../components/ui/label'
import useScoket from '../../zustand/socket.config'
import { api } from '../../api/Api'
import Profile from '../../UI/Profile/Profile'
import { Pencil } from 'lucide-react'

// import { Button } from "@/components/ui/button"
type updateprofile = {
    Fullname?: string,
        Email?: string,
        Phone?: string,
        address?: string
}

const getprofile = async (userId: string,) => {
    const res = await api.get(`users/getprofile/${userId}`)
    return res.data
}
const updateProfile = async (authUser: string,update: updateprofile) =>{
    const res = await api.patch(`users/update/${authUser}`,
        update
    )
    return res.data
}

const Details = () => {
    const { authUser, checkauth } = useScoket()
    const [update, setUpdate ] = useState({
        Fullname: "",
        Email: "",
        Phone: "",
        address: ""
    })
    const mutation = useMutation({
        mutationKey: [update],
        mutationFn: (update:updateprofile)=>updateProfile(authUser?.id!, update),
        onSuccess:(data)=>{
       console.log(data)
        },
        onError:()=>{
            alert("the errror occur during send")
        }
        
        
    })
    const data = [
        {
            title: "Home",
            address: "baneshowr, ktm",
            icon: "🏠"
        },
        {
            title: "office",
            address: "baneshowr, ktm",
            icon: "🏢"
        }
    ]
    useEffect(() => {
        checkauth()
    }, [])
    const { data: profile } = useQuery({
        queryKey: [authUser?.id],
        queryFn: () => getprofile(authUser!.id),
        enabled: !!authUser?.id
    })
    console.log("the profile is ", profile)

    return (
        <div className='w-full h-full p-2'>
            <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4' >
                <p className='font-bold text-white'>personal information</p>
                <div className='flex flex-col  p-3 '>
                    <div className="grid grid-cols-2 gap-4 text-white">
                        <div>
                            <label className="text-gray-400">Full Name</label>
                            <div className="bg-[#222233] border border-[#3B3B4F] rounded-lg p-2 flex justify-between items-center">
                                <span>{profile?.FullName}</span>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Pencil className='text-gray-500' size={15}/>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <FieldLabel className='text-gray-500'>Fullname</FieldLabel>
                                               <Input
                                                value={update.Fullname} 
                                                onChange={(e)=>setUpdate({...update, Fullname:e.target.value})}
                                                 placeholder='Change your fullname' />
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={()=>mutation.mutate(
                                                {Fullname: update.Fullname}
                                            )}>Change</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400">Email</label>
                            <div className="bg-[#222233] border border-[#3B3B4F] rounded-lg p-2 flex justify-between items-center">
                                <span>{profile?.Email}</span>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Pencil className='text-gray-500' size={15}/>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <FieldLabel className='text-gray-500'>Email</FieldLabel>
                                               <Input value={update.Email} onChange={(e)=>setUpdate({...update,Email: e.target.value})} placeholder='Change your Email' />
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                             onClick={()=>mutation.mutate({
                                                Email: update.Email
                                             })}>Change</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-white">
                        <div>
                            <label className="text-gray-400">Phone</label>
                            <div className="bg-[#222233] border border-[#3B3B4F] rounded-lg p-2 flex justify-between items-center">
                                <span>{profile?.Phone}</span>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Pencil className='text-gray-500' size={15}/>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <FieldLabel className='text-gray-500'>Phone</FieldLabel>
                                               <Input type='number' value={update.Phone} onChange={(e)=>setUpdate({...update, Phone:e.target.value})} placeholder='Change your phone' />
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={()=>mutation.mutate({Phone:update.Phone})}>Change</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>

                        <div>
                            <label className="text-gray-400">Address</label>
                            <div className="bg-[#222233] border border-[#3B3B4F] rounded-lg p-2 flex justify-between items-center">
                                <span>kathmandu,Nepal</span>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Pencil className='text-gray-500' size={15}/>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <FieldLabel className='text-gray-500'>Address</FieldLabel>
                                               <Input value={update.address} onChange={(e)=>setUpdate({...update, address:e.target.value})} placeholder='Change your Address' />
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={()=>mutation.mutate({
                                                address:update.address
                                            })}>Change</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>

                    <Button className='bg-blue-700 mt-7 p-4 hover:bg-blue-700'>Change profile</Button>

                </div>
            </div>
            {profile?.Role === "PASSENGERS" && (
                <div className='bg-[#0E1328]  rounded-lg border-2 mt-5 border-[#3B3B4F] p-4' >
                    {
                        Array.isArray(data) && data.map((dta, idx) => (
                            <div key={idx} className='flex flex-col mt-3 justify-between text-white   '>
                                <div className='flex gap-2 items-center justify-start '>
                                    <span>{dta.icon}</span>
                                    <div className='flex flex-col  p-2'>
                                        <span>{dta.title}</span>
                                        <span className='text-sm text-gray-700'>{dta.address}</span>
                                    </div>
                                </div>
                                <hr className='border border-gray-600' />
                            </div>
                        ))

                    }
                    <div className='w-full'>
                        <AlertDialog>
                            <AlertDialogTrigger className='w-full' asChild >
                                <Button className='bg-transparent border border-gray-700 rounded-lg w-full p-2 text-blue-700 mt-4
                        '>+ add address</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-gray-800 text-white'>
                                <AlertDialogHeader>
                                    <AlertDialogDescription className='flex flex-col gap-2 w-full'>
                                        <Field>
                                            <Label>Title</Label>
                                            <Input type='text' placeholder='Enter the title' />
                                        </Field>
                                        <Field>
                                            <Label>location</Label>
                                            <Input type='text' placeholder='Enter the location' />
                                        </Field>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>)}
            {profile?.Role === "DRIVER" && (
                <div className='bg-[#0E1328]  rounded-lg border-2 border-[#3B3B4F] p-4 mt-5 text-white'>
                    <p>Vehicles</p>
                    <div className='flex flex-col gap-3 mt-4 text-gray-400 text-sm'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <p>VEHICLESTYPE</p>
                                <span>{profile?.Driver?.vechicles?.type}</span>

                            </div>
                            <hr className='border border-gray-500 mt-2' />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <p>plateNumber</p>
                                <span>{profile?.Driver?.vechicles?.plateNumber}</span>

                            </div>
                            <hr className='border border-gray-500 mt-2' />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <p>model</p>
                                <span>{profile?.Driver?.vechicles?.model}</span>

                            </div>
                            <hr className='border border-gray-500 mt-2' />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <p>licenseExpery</p>
                                <span>{profile?.Driver?.licenseExpery}</span>

                            </div>
                            <hr className='border border-gray-500 mt-2' />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <p>seatCapacity</p>
                                <span>{profile?.Driver?.vechicles?.seatCapacity}</span>

                            </div>
                            <hr className='border border-gray-500 mt-2' />
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Details
