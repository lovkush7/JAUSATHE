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
  FieldSeparator,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Link, redirect, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { api } from "@/api/Api"
import { useMutation } from "@tanstack/react-query"


export const SignupForm = () => {
  const [Text, SetText] = useState({
    FullName: '',
    Email: '',
    password: '',
    Phone: '',
    Role: 'EMPLOYEE',
  })
  const navigate = useNavigate()
 const sendreq = async(text : any)=>{
  const res = await api.post("/auth/signup", text )
  return res.data;
 }

const mutation = useMutation({
  mutationKey: ["signup"],
  mutationFn: sendreq,

  onSuccess: ()=>{
   navigate({to: "/"})
  }
})

const handlesubmit =(e: any) =>{
e.preventDefault();
console.log(Text)
console.log(e.target.value)
mutation.mutate(Text)
}

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div  >
        <Card className="p-3 h-full bg-gray-800 text-gray-400 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription className="">
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlesubmit}>
              <FieldGroup>
                <Field>
               
                  <Button variant="outline" type="button" className="text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card ">
                  <p className="text-black "> Or continue with</p>
                </FieldSeparator>
                <Field>
                  <FieldLabel htmlFor="email">Fullname</FieldLabel>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Enter the fullname"
                    value={Text.FullName}
                    onChange={(e) => SetText({ ...Text, FullName: e.target.value })}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={Text.Email}
                    onChange={(e) => SetText({ ...Text, Email: e.target.value })}

                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••"
                    value={Text.password}
                    onChange={(e) => SetText({ ...Text, password: e.target.value })}
                    required />
                </Field>
             
               <Field>
                  <FieldLabel htmlFor="email">Phone</FieldLabel>
                  <Input
                    id="phone"
                    type="phone"
                    placeholder="+977..."
                    value={Text.Phone}
                    onChange={(e) => SetText({ ...Text, Phone: e.target.value })}

                    required
                  />
                </Field>

                <Field className="">
                  <FieldLabel htmlFor="form-country">Role</FieldLabel>
                  <Select   defaultValue="PASSENGERS" value={Text.Role}
                    onValueChange={(value) => {
                      if (value) {
                        SetText({ ...Text, Role: value })
                      }
                    }}>
                    <SelectTrigger id="" >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="PASSENGERS"> PASSENGERS</SelectItem>
                      <SelectItem value="DRIVER">DRIVER</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <Button type="submit">Signup</Button>
                  <FieldDescription className="text-center">
                    already have an account? <Link to={"/auth/login"}>Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  )
}

