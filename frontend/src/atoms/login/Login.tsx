import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/Api'
import useScoket from '../../zustand/socket.config'
import { format } from "date-fns"

const Login = () => {
  const [value, setvalue] = useState({
    Email: '',
    password: '',
  })
  const { connectsocket } = useScoket()
  const navigate = useNavigate()
  const sendlogin = async (value: any) => {
    try {
      const res = await api.post('/auth/login', value)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM do 'at' h:mma").toLowerCase();


  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: sendlogin,




    onSuccess: (data) => {

      toast.success("Login successful", {
        description: formattedDate,
        position: "top-center",
      })
      connectsocket()
      console.log(data)
      const role = data.Role;
      if (role === "PASSENGERS") {

        navigate({ to: "/" })
      }
      if (role === "DRIVER") {
        navigate({ to: "/DriverDashboard" })
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        description: formattedDate,
        position: "top-center",
      })
    }
  })
  const handlesubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(value)
  }
  return (

    <div >
      <Card className='bg-[#08080F] text-gray-400 shadow-lg'>
        <CardHeader className='text-center'>
          <p><span className='text-3xl text-white  font-bold'>जाऔँ</span  ><span className='text-3xl text-blue-500 font-bold'>SATHE</span></p>
          <CardTitle>Login to your account</CardTitle>

        </CardHeader>
        <CardContent >
          <form onSubmit={handlesubmit}>
            <FieldGroup className='mt-8'>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={value.Email}
                  onChange={(e) => setvalue({ ...value, Email: e.target.value })}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={value.password}
                  onChange={(e) => setvalue({ ...value, password: e.target.value })}
                  placeholder="••••••••"
                  required />
              </Field>
              <Field>
                <Button className='bg-blue-600' type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to='/auth/Signup'>signup</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default Login
