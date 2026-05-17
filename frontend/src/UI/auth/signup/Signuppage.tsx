import { SignupForm } from '@/atoms/signup/Signup'
import React from 'react'

const Signuppage = () => {
  return (
      <div className='flex items-center justify-center min-h-screen bg-gray-900 px-4'>
      <div className='w-full max-w-4xl'>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signuppage

