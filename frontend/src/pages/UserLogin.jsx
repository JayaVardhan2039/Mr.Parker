import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [UserData, setUserData] = useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            email:email,
            password:password
        })
        console.log(UserData)

        setEmail('')
        setpassword('')
    }
return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10 ' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"></img>
            
            <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                    <input 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="email" 
                    placeholder="Enter your email" 
                    />
                    <h3 className='text-lg font-medium mb-2'    >Enter your password</h3>
                    <input 
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="Enter your password" />
                    <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
                    <p className='text-center'>New here?<Link to='/user-register' className='text-blue-600'>Create an Account </Link></p>
            </form>
        </div>
        <div>
            <Link to='/mrparker-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Mr.Parker</Link>
        </div>
    </div>
)
}

export default UserLogin