import React from 'react'
import Navbar from '../../molecules/navbar/Navbar'
import { Button } from '../../components/ui/button'
import { api } from '../../api/Api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
 const logout = async()=>{
  const res = await api.post("/auth/logout")
  console.log(res.data)
  return res.data
 }

const Profile = () => {

  const navigation = useNavigate();
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: ()=>{
       navigation({to: "/Splash"})
    }
  })
  return (
    <div>
        <Navbar/>
         <Button onClick={()=>mutation.mutate()}>Logout</Button>
    </div>
  )
}

export default Profile
