import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
export const UserRegister = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [Firstname, setFirstname] = useState('')
    const [Lastname, setLastname] = useState('')
    const [UserData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setUserData({
            fullName:{
                Firstname:Firstname,
            Lastname:Lastname,
            },
            email:email,
            password:password
        })
        setFirstname('')
        setLastname('')
        setEmail('')
        setpassword('')
        console.log(UserData)
    }
  return (
    
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10 ' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"></img>
            
            <form onSubmit={(e) => submitHandler(e)}>
            
                    <h3 className='text-lg font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-3 mb-6'>
                    <input 
                    required 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                    type="text" 
                    placeholder="First name" 
                    value={Firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input 
                    className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                    type="text" 
                    placeholder="Last name"
                    value={Lastname}
                    onChange={(e) => setLastname(e.target.value)} 
                    />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                    <input 
                    required 
                    className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
                    <input 
                    required
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    />
                    <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg'>Register</button>
                    <p className='text-center'>Already have an account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
            </form>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>By proceeding, you consent to receive emails related to your account, including important updates and notifications. You also agree to our terms of service and privacy policy, ensuring a secure and seamless experience</p>
        </div>
    </div>
  )
}

export default UserRegister