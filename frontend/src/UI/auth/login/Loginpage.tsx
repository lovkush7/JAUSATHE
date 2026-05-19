import Login from '@/atoms/login/Login'
import React from 'react'

const Loginpage = () => {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-900">
      <div className="w-full max-w-sm">
       <Login/>
      </div>
    </div>
  )
}

export default Loginpage;
