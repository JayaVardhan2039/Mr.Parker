import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {MrParkerDataContext} from '../Context/MrParkerContext'
import { useContext } from 'react'

export const MrParkerLogin = () => {
    const [email, setEmail] = useState('')
        const [password, setpassword] = useState('')

        const { MrParker, setMrParker } = useContext(MrParkerDataContext)
        const navigate = useNavigate()
        

        const submitHandler = async(e) => {
            e.preventDefault()
            const MrParkerr={
                email:email,
                password:password
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/mrparkers/login`,MrParkerr)

            if (response.status===200)
            {
                const data = response.data
                setMrParker(data.MrParkerr)
                localStorage.setItem('token',data.token)
                navigate('/mrparker-home')
            }
    
            setEmail('')
            setpassword('')
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <span className="mr-2 quicksand absolute top-4 left-4 z-50 text-xl font-bold flex items-center">Mr.Parker</span>  
         
        <div className='mt-10'>
            <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your parker email?</h3>
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
                    <p className='text-center'>Join The Fleet? <Link to='/mrparker-register' className='text-blue-600'>Register as a Mr.Parker</Link></p>
            </form>
        </div>
        <div>
            <Link to='/User-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default MrParkerLogin