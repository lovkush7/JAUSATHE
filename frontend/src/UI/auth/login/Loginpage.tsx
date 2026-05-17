import Login from '@/atoms/login/Login'
import React from 'react'

const Loginpage = () => {
  return (
       <div className='flex items-center justify-center min-h-screen bg-gray-900 px-4'>
      <div className='w-full max-w-4xl'>
        <Login />
      </div>
    </div>
  )
}

export default Loginpage;
