import React, { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../api/Api'
import { useNavigate } from '@tanstack/react-router'
interface driververificationPayload{
    licenseNumber: string
    citizenshipNumber: string
    licenseExpery: string
    vehicleType: string
    vechicleModel: string
    plateNumber: string
    seatCapacity: string
}
function DriverAuth() {
    const [licenseNumber, setlicenseNumber] = useState("")
     const [licenseExpery, setlicenseExpery] = useState("")
     const [citizenshipNumber, setcitizenshipNumber] = useState("")
    const [Vechicle, setVechicle] = useState({
        vehicleType: " BIKE"
    })
    const [VecileModel, setVecileModel] = useState("")
    const [PlateNumber, setPlateNumber] = useState("")
    const [SeatCapacity, setSeatCapacity] = useState("")
    const navigate = useNavigate()

    const mutation =  useMutation({
       mutationKey: [licenseNumber, licenseExpery, citizenshipNumber, Vechicle.vehicleType],
       mutationFn: async(data: driververificationPayload)=>{
        const res = await api.post("/driver/registerdriver", data)
        return res.data;

       },
       onSuccess: ()=>{
        setlicenseNumber("")
        setlicenseExpery("")
        setcitizenshipNumber("")
        navigate({to: "/DriverDashboard"})
       },
       onError:()=>{
        console.log("the error is occured")
       }
       
    })
    return (
        <div className='bg-[#08080F] flex h-screen w-full justify-center items-center'>
            <Card size="sm" className="overflow-y-auto bg-[#161628] text-white border-2 border-[#3B3B4F] mx-auto w-full max-w-sm p-4 ">
                <CardHeader>
                    <CardTitle>Driver Verification</CardTitle>
                    <CardDescription>
                          please fill the required field for driver verification
                    </CardDescription>
                </CardHeader>
                <CardContent className='p-4'>
                    <Field>
                        <FieldLabel htmlFor="email">licenseNumber</FieldLabel>
                        <Input
                            id="licenseNumber"
                            type="text"
                            placeholder="Enter the licenseNumber"
                            value={licenseNumber!}
                            onChange={(e) => setlicenseNumber(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                    <br />
                     <Field>
                        <FieldLabel htmlFor="email">citizenshipNumber</FieldLabel>
                        <Input
                            id="citizenshipNumber"
                            type="number"
                            placeholder="Enter the citizenshipNumber "
                            value={citizenshipNumber!}
                            onChange={(e) => setcitizenshipNumber(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                    <br />
                     <Field>
                        <FieldLabel htmlFor="email">licenseExpery</FieldLabel>
                        <Input
                            id="licenseExpery"
                            type="date"
                            placeholder="Enter the licenseExpery Date"
                            value={licenseExpery!}
                            onChange={(e) => setlicenseExpery(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                    <br />
                    <Field className="" >
                        <FieldLabel htmlFor="form-country">Vechicle</FieldLabel>
                        <Select  defaultValue="BIKE" value={Vechicle.vehicleType}
                            onValueChange={(value) => {
                                if (value) {
                                    
                                     setVechicle({ ...Vechicle, vehicleType: value })
                                }
                            }}>
                                
                            <SelectTrigger id="" >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="CAR">CAR</SelectItem>
                                <SelectItem value="BIKE"> BIKE</SelectItem>
                                <SelectItem value="TAXI">TAXI</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                     <Field>
                        <FieldLabel htmlFor="email">VecileModel</FieldLabel>
                        <Input
                            id="VecileModel"
                            type="text"
                            placeholder="Enter the VecileModel "
                            value={VecileModel!}
                            onChange={(e) => setVecileModel(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                    <br />
                     <Field>
                        <FieldLabel htmlFor="email">PlateNumber</FieldLabel>
                        <Input
                            id="PlateNumber"
                            type="number"
                            placeholder="Enter the PlateNumber "
                            value={PlateNumber!}
                            onChange={(e) => setPlateNumber(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                    <br />
                    <Field>
                        <FieldLabel htmlFor="email">SeatCapacity</FieldLabel>
                        <Input
                            id="SeatCapacity"
                            type="number"
                            placeholder="Enter the SeatCapacity "
                            value={SeatCapacity!}
                            onChange={(e) => setSeatCapacity(e.target.value)}
                            className='border-gray-500'
                            required
                        />
                    </Field>
                </CardContent>
             
                    <Button  onClick={()=>mutation.mutate({
                        licenseNumber,
                        citizenshipNumber,
                        licenseExpery,
                        vehicleType: Vechicle.vehicleType,
                        vechicleModel: VecileModel,
                        plateNumber: PlateNumber,
                        seatCapacity: SeatCapacity
                    })} className="w-full bg-blue-600">
                        Action
                    </Button>
                
            </Card>
        </div>
    )
}

export default DriverAuth
