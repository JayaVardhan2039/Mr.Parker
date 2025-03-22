import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { MrParkerDataContext } from '../Context/MrParkerContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const MrParkerRegister = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    const {MrParker, setMrParker} = useContext(MrParkerDataContext)
    const navigate = useNavigate()
    
    const submitHandler = async (e) => {
        e.preventDefault()

        const newMrParker = {
            fullname:{
                firstname:firstname,
                lastname:lastname,
            },
            email:email,
            password:password,
            phonenumber:phonenumber
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/mrparkers/register`,newMrParker)

        if (response.status===201)
        {
            const data = response.data
            setMrParker(data.MrParker)
            localStorage.setItem('token',data.token)    
            navigate('/mrparker-home')

        }

        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setPhonenumber('')
    }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
        <span className="mr-2 quicksand absolute top-4 left-4 z-50 text-xl font-bold flex items-center">Mr.Parker</span>  
            
            <div className='mt-10'>
            <form onSubmit={(e) => submitHandler(e)}>
            
                    <h3 className='text-lg font-medium mb-2'>What's Our Mr.Parker's Name?</h3>
                    <div className='flex gap-3 mb-6'>
                    <input 
                    required 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                    type="text" 
                    placeholder="First name" 
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input 
                    className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                    type="text" 
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)} 
                    />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's our Mr.Parker's email?</h3>
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
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>What's your phone number?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="text"
                        placeholder="Enter your phone number"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg'>Register</button>
                    <p className='text-center'>Already have an account? <Link to='/mrparker-login' className='text-blue-600'>Login here</Link></p>
            </form>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service</span> apply</p>
        </div>
    </div>
  )
}

export default MrParkerRegister
