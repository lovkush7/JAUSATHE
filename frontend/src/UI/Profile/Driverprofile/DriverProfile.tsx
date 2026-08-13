import React, { useEffect } from 'react'
import DriverNavbar from '../../../lib/DriverNavbar'
import Profiles from '../../../atoms/profile/Profiles'
import Details from '../../../atoms/profile/Details'
import { Button } from '../../../components/ui/button'
import useScoket from '../../../zustand/socket.config'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../api/Api'
const logout = async()=>{
  const res = await api.post("/auth/logout")
  console.log(res.data)
  return res.data
 }
const DriverProfile = () => {
     const {checkauth} = useScoket()
      useEffect(() => {
          checkauth()
      }, [])

  const navigation = useNavigate();
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: ()=>{
       navigation({to: "/Splash"})
    }
  })
  return (
  <div className='bg-[#08080F] h-screen w-full overflow-y-auto'>
      <DriverNavbar/>
        <div className='flex'>
        <div className='w-[350px] border-l p-3'>
            <Profiles/>
        </div>
        <div className='flex-1 mt-4 ml-4'>
          <Details/>
        </div>
        </div>
         <Button onClick={()=>mutation.mutate()}>Logout</Button>
    </div>
  )
}

export default DriverProfile
